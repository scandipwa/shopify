const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const includePaths = require('../common/get-include-paths');

// TODO what if installed in node_modules?
const locateExtensionFile = (condition) => {
    // Find a path starts with this condition
    if (typeof condition === 'string') {
        return includePaths.find((filepath) => filepath.startsWith(condition));
    }

    // Find a path that when passed to the condition returns true
    if (typeof condition === 'function') {
        return includePaths.find(condition);
    }

    // Find a path that complies to the RegExp given
    if (condition instanceof RegExp) {
        return includePaths.find((filepath) => condition.test(filepath));
    }

    // Find a condition that evaluates to something at the other conditions
    if (Array.isArray(condition)) {
        return condition.find(locateExtensionFile);
    }

    // ? Branching logic here
    if (typeof condition === 'object') {
        // TODO ???
        // For now - ignore objects, they're too tricky
    }

    return false;
}

const getExtensionsIncludeRules = (rules = []) => rules.filter(
    (rule) => locateExtensionFile(rule.include)
);

const getExtensionsExcludeRules = (rules = []) => rules.filter(
    (rule) => locateExtensionFile(rule.exclude)
);

const enforceIncludeExtensions = (webpackConfig, isDisableExcludeWarning) => {
    console.log(require.main);
    process.exit(0);
    return webpackConfig;

    const extensionsIncludeRules = getExtensionsIncludeRules(webpackConfig.module.rules);
    const extensionsExcludeRules = getExtensionsExcludeRules(webpackConfig.module.rules);

    extensionsIncludeRules.forEach((rule) => rule.include.push(...includePaths));

    extensionsExcludeRules.forEach((rule) => {
        const impactedExtensionFile = locateExtensionFile(rule.exclude);

        if (!isDisableExcludeWarning && !warned) {
            logger.error(
                `One of the webpack's ${logger.style.code('module.rules')} excludes one or several extension file(s) from loading`,
                `The non-loaded file is: ${logger.style.file(impactedExtensionFile)}`,
                'Please make sure that this file is not excluded from being processed with loaders.'
            );

            process.exit(1);
        }
    })
};

module.exports = enforceIncludeExtensions;