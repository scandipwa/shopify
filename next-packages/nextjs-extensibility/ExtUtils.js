/* eslint-disable max-lines */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-one-class */
/* eslint-disable max-classes-per-file */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

import applyClassWrappers from './lib/middlewarers/generateMiddlewaredClass';

const handlerTypes = [
    'member-function',
    'member-property',
    'static-member',
    'function',
    'class'
];

/**
 * Handlers which don't require member name specification
 */
const handlersWithReducedSections = [
    'function',
    'class'
];

/**
 * Check if supplied handler type is expected
 * @param {string} handlerType
 */
function validateHandlerType(handlerType, namespace) {
    if (!handlerTypes.includes(handlerType)) {
        throw Error(`Unexpected handler type '${handlerType}' for namespace '${namespace}', expected one of [${
            handlerTypes.join(', ')
        }]`);
    }
}

/**
 * Wrap param in array if it is not array already
 */
const arrayize = (x) => (Array.isArray(x) ? x : [x]);

/**
 * Push at once to handler section, separation by member names not expected
 * @param {Object} overallConfig
 * @param {string} namespace
 * @param {string} handlerType
 * @param {Array} membersPlugins
 */
const handleReducedSection = (overallConfig, namespace, handlerType, membersPlugins) => {
    if (!overallConfig[namespace][handlerType]) {
        overallConfig[namespace][handlerType] = [];
    }

    arrayize(membersPlugins).forEach((memberPlugin) => {
        overallConfig[namespace][handlerType].push(memberPlugin);
    });
};

/**
 * Separate namespace plugins by member names
 * @param {Object} overallConfig
 * @param {string} namespace
 * @param {string} handlerType
 * @param {Array} membersPlugins
 */
const handleRegularSection = (overallConfig, namespace, handlerType, membersPlugins) => {
    if (!overallConfig[namespace][handlerType]) {
        overallConfig[namespace][handlerType] = {};
    }

    Object.entries(membersPlugins).forEach(([memberName, memberPlugins]) => {
        if (!overallConfig[namespace][handlerType][memberName]) {
            overallConfig[namespace][handlerType][memberName] = [];
        }
        arrayize(memberPlugins).forEach((memberPlugin) => {
            overallConfig[namespace][handlerType][memberName].push(memberPlugin);
        });
    });
};

const DEFAULT_POSITION = 100;
const sortPluginArray = (plugins) => plugins.sort(
    ({ position: a = DEFAULT_POSITION }, { position: b = DEFAULT_POSITION }) => a - b
);

/**
 * Sort the configuration so that plugins with higher priority (lower "posititon" value)
 * Go before the ones with lower priority (higher "position" value).
 * @param {Object} config
 */
const sortConfig = (config) => {
    // Process each namespace
    for (const namespace in config) {
        // Each handler type of a namespace
        for (const handlerType in config[namespace]) {
            // Handle reduced sections
            if (handlersWithReducedSections.includes(handlerType)) {
                config[namespace][handlerType] = sortPluginArray(config[namespace][handlerType]);
                continue;
            }

            // Handle regular sections
            for (const memberName in config[namespace][handlerType]) {
                config[namespace][handlerType][memberName] = sortPluginArray(
                    config[namespace][handlerType][memberName]
                );
            }
        }
    }
};

/**
 * Entry point
 */
const generateConfig = (extensions) => {
    const config = extensions.reduce(
        (overallConfig, extension) => {
            Object.entries(extension).forEach(([namespace, plugins]) => {
                if (!overallConfig[namespace]) {
                    overallConfig[namespace] = {};
                }
                Object.entries(plugins).forEach(([handlerType, membersPlugins]) => {
                    validateHandlerType(handlerType, namespace);
                    if (handlersWithReducedSections.includes(handlerType)) {
                        handleReducedSection(overallConfig, namespace, handlerType, membersPlugins);
                    } else {
                        handleRegularSection(overallConfig, namespace, handlerType, membersPlugins);
                    }
                });
            });

            return overallConfig;
        }, {}
    );

    sortConfig(config);
    return config;
};

// Key for processable classes to determine whether they are already extensible
const extensible = Symbol('Extensible');
const cacheIdentityKey = Symbol('CacheIdentityKey');

// Cache to optimise class generation
const generated = [];

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/derived-class-names
class EmptyBase {}

const addNamespaceToMiddlewarable = (Middlewarable, namespace) => {
    // Retrieve already existing namespaces
    // Prevent mutating the namespaces of parent object
    const namespaces = Object.assign(
        [],
        Reflect.get(Middlewarable.prototype, '__namespaces__')
    );

    // Prevent duplicate namespaces for overridden classes
    if (!namespaces.includes(namespace)) {
        namespaces.push(namespace);
    }

    // Set the namespaces for class
    // eslint-disable-next-line no-param-reassign
    Middlewarable.prototype.__namespaces__ = namespaces;
};

class ExtUtils {
    plugins = {};

    setPlugins(importArray) {
        this.plugins = generateConfig(importArray);
    }

    getPluginsForClass(namespaces) {
        // The last pushed into the namespaces array namespace
        // Is an actual, not an inherited one.
        const outerNamespace = namespaces[namespaces.length - 1];

        try {
            return this.plugins[outerNamespace].class || [];
        } catch (e) {
            return [];
        }
    }

    generateMiddlewaredClass(proxy) {
        const { __namespaces__ } = proxy.prototype;
        const namespacePluginsClass = this.getPluginsForClass(__namespaces__);

        // Wrap class in its `class` plugins to provide `class` API
        const wrappedClass = namespacePluginsClass.reduce(
            (acc, plugin) => this.getWrapperFromPlugin(plugin, proxy.name)(acc),
            proxy
        );

        return wrappedClass;
    }

    generateConstructHandler(namespaces) {
        return (TargetClass, args, newTarget) => {
            // Get an instance
            const instance = Reflect.construct(TargetClass, args, newTarget);

            // Get all member-property plugins
            const namespacesPluginsConstruct = this.getPluginsForMember(namespaces, 'member-property');

            // Handle plugin -> property interactions
            namespacesPluginsConstruct.forEach(
                (namespacePluginsConstruct) => Object.entries(namespacePluginsConstruct).forEach(
                    // Apply each plugin to the instance
                    ([memberName, memberPluginsConstruct]) => {
                        // Retrieve the original member
                        const origMember = instance[memberName] || (() => {});
                        const sortedPlugins = memberPluginsConstruct;

                        // Wrap it into the plugins
                        const newMember = sortedPlugins.reduce(
                            (acc, plugin) => {
                                const wrapper = this.getWrapperFromPlugin(plugin, origMember.name);

                                return wrapper(acc, instance);
                            },
                            origMember
                        );

                        // Replace the original member with the new one, wrapped into the plugins
                        instance[memberName] = newMember;
                    }
                )
            );

            // Handle construct logic
            if (instance.__construct) {
                // Call the "magic" __construct member function
                instance.__construct(...args);
            }

            // Return the processed instance
            return instance;
        };
    }

    generateApplyHandler(namespace) {
        return (origFunction, thisArg, originalArgs) => {
            // Get plugins for the function
            const memberPluginsApply = this.getPluginsForMember(namespace, 'function');

            // If no plugins => return the original function
            if (!memberPluginsApply.length) {
                return origFunction.apply(thisArg, originalArgs);
            }

            // Return the result of a call of a generated function (=wrapped into plugins)
            return this.generateMiddlewaredFunction(
                origFunction,
                memberPluginsApply,
                thisArg
            )(...originalArgs);
        };
    }

    getNamespacesFromMiddlewarable(Middlewarable) {
        return Middlewarable.prototype.__namespaces__;
    }

    getWrapperFromPlugin(plugin, memberName) {
        const { implementation } = plugin;

        if (typeof plugin === 'function') {
            return plugin;
        }

        if (typeof implementation === 'function') {
            return implementation;
        }

        throw new Error(
            `No implementation found in plugin definition for member ${memberName}.`
        );
    }

    getPluginsForMember(namespaces, targetSpecifier, memberName) {
        return namespaces.reduce(
            (acc, namespace) => {
            // Handle no member name: return all plugins for the provided section
                if (!memberName) {
                    try {
                        const pluginsOfType = this.plugins[namespace][targetSpecifier];

                        if (pluginsOfType) {
                            return acc.concat(pluginsOfType);
                        }
                    } catch (e) {
                        // ingore the error
                    }
                } else {
                    try {
                        // Handle member name present
                        const { value } = Object.getOwnPropertyDescriptor(
                            this.plugins[namespace][targetSpecifier] || {},
                            memberName
                        ) || {};

                        if (value) {
                            return acc.concat(value);
                        }
                    } catch (e) {
                        // ingore the error
                    }
                }

                return acc;
            }, []
        );
    }

    generateMiddlewaredFunction(origMember = () => {}, sortedPlugins, origContext) {
        return (...args) => {
            const newMember = sortedPlugins.reduce(
                (acc, plugin) => () => {
                    const wrapper = this.getWrapperFromPlugin(plugin, origMember.name);

                    // Provide different arguments due to API difference
                    // Between property and function call interception
                    return typeof origMember === 'object'
                        ? wrapper(acc, origContext)
                        : wrapper(
                            args,
                            acc.bind(origContext),
                            origContext
                        );
                },
                origMember
            );

            return newMember(args);
        };
    }

    generateGetHandler(targetType, namespaces) {
        return (target, memberName, proxy) => {
        // Get the original member
            const origMember = Reflect.get(target, memberName, proxy);

            // GET handler intercepts static members on classes
            // And instance members (member-functions) on instances
            const targetSpecifier = targetType === 'class'
                ? 'static-member'
                : 'member-function';

            // Get the plugins
            const memberPluginsGet = this.getPluginsForMember(namespaces, targetSpecifier, memberName);

            // If no plugins - return the original member
            if (!memberPluginsGet.length) {
                return origMember;
            }

            // Generate a function which is original member wrapped into the plugins
            const middlewaredFunction = this.generateMiddlewaredFunction(
                origMember,
                memberPluginsGet,
                proxy
            );

            // If original member was an object - return the value from the function call
            if (typeof origMember === 'object') {
                return middlewaredFunction();
            }

            // Return the function wrapped into plugins
            return middlewaredFunction;
        };
    }

    Extensible(BaseClass = EmptyBase) {
        // NOTE! Base class is original class which class extends

        // Handle already extensible classes
        if (BaseClass[extensible]) {
            return BaseClass;
        }

        const { name } = BaseClass;
        const {
            // Generate unique cache identities as default value
            value: cacheIdentity = Symbol(`Cache Identity ${name}`)
        } = Object.getOwnPropertyDescriptor(BaseClass, cacheIdentityKey) || {};

        const getGetHandler = (__namespaces__) => this.generateGetHandler('instance', __namespaces__);

        // If such class is not yet generated => generate the class
        if (!generated[cacheIdentity]) {
            /**
             * What this class does, is:
             * - extends what original class did extend
             * - defines a constructor which calls original parent
             */

            const GeneratedClass = class Extensible extends BaseClass {
                constructor(...args) {
                    super(...args);
                    const { __namespaces__ } = Object.getPrototypeOf(this);
                    const getHandler = getGetHandler(__namespaces__);
                    return new Proxy(this, { get: getHandler });
                }

                __construct() {}
            };

            GeneratedClass[extensible] = true;
            generated[cacheIdentity] = GeneratedClass;
            Object.defineProperty(
                BaseClass,
                cacheIdentityKey,
                { value: cacheIdentity, writable: false }
            );
        }

        return generated[cacheIdentity];
    }

    middleware(Middlewarable, namespace) {
        addNamespaceToMiddlewarable(Middlewarable, namespace);

        const handler = {
            // Get handler for members - intercepts `get` calls, meant for class static members
            get: this.generateGetHandler('class', this.getNamespacesFromMiddlewarable(Middlewarable)),

            // Apply handler for functions - intercepts function calls
            apply: this.generateApplyHandler(this.getNamespacesFromMiddlewarable(Middlewarable)),

            // Construct handler for classes - intercepts `new` operator calls, changes properties
            construct: this.generateConstructHandler(this.getNamespacesFromMiddlewarable(Middlewarable))
        };

        const proxy = new Proxy(Middlewarable, handler);

        // TODO check if class
        return applyClassWrappers(proxy);
    }
}

const utils = new ExtUtils();

export default utils;
