/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

// const FallbackPlugin = require('@scandipwa/webpack-fallback-plugin');
// const { sources } = require('@scandipwa/scandipwa-scripts/lib/sources');
// const url = require('url');
const path = require('path');
const extensions = require('@scandipwa/scandipwa-dev-utils/extensions');
const allExtensionImports = require('@scandipwa/nextjs-extensibility/build-config/webpack-extension-import-loader');

module.exports = () => {
    // const abstractStyle = FallbackPlugin.getFallbackPathname('src/style/abstract/_abstract.scss');

    return {
        webpack: (config, { webpack }) => {
            // console.log(config);

            config.plugins.push(...[
            // In development mode, provide simple translations and React
                new webpack.ProvidePlugin({
                    React: 'react',
                    // legacy support
                    PureComponent: ['react', 'PureComponent']
                }),

                // Provide BEM specific variables
                new webpack.DefinePlugin({
                    'process.env': {
                        REBEM_MOD_DELIM: JSON.stringify('_'),
                        REBEM_ELEM_DELIM: JSON.stringify('-'),
                        SCANDI_PLUGINS: JSON.stringify(allExtensionImports)
                    }
                })
            ]);

            // Allow importing .ts and .tsx files without specifying the extension
            config.resolve.extensions.push('.ts');
            config.resolve.extensions.push('.tsx');

            // Allow everything to be processed by babel
            // eslint-disable-next-line fp/no-delete
            // delete config.module.rules[0].exclude;
            // eslint-disable-next-line fp/no-delete
            // delete config.module.rules[0].include;

            // const extensionPaths = extensions.map(({ packagePath }) => packagePath);
            // config.module.rules[0].include.push(...extensionPaths);

            config.plugins.forEach((plugin) => {
                if (plugin instanceof webpack.ProvidePlugin) {
                    plugin.definitions.middleware = [
                        '@scandipwa/nextjs-extensibility/middleware',
                        'default'
                    ];

                    plugin.definitions.Extensible = [
                        '@scandipwa/nextjs-extensibility/Extensible',
                        'default'
                    ];

                    plugin.definitions.ScandiPlugins = [
                        '@scandipwa/nextjs-extensibility/runtime-helpers',
                        'default'
                    ];
                }
            });

            const PATH_DELIMITER = '[\\\\/]'; // match 2 antislashes or one slash
            const safePath = (module) => module.split('/').join(PATH_DELIMITER);

            config.resolve.symlinks = false;

            const extensionPaths = [
                ...extensions.map(({ packagePath }) => new RegExp(packagePath)),
                ...extensions.map(({ packageName }) => new RegExp(safePath(packageName)))
            ];

            if (Array.isArray(config.externals)) {
                config.externals = config.externals.map((external) => {
                    if (typeof external !== 'function') {
                        return external;
                    }

                    return (ctx, req, cb) => {
                        return extensionPaths.filter(Boolean).find((include) => (req.startsWith('.')
                            ? new RegExp(include).test(path.resolve(ctx, req))
                            : new RegExp(include).test(req)))
                            ? cb()
                            : external(ctx, req, cb);
                    };
                });
            }

            config.module.rules.unshift({
                test: /\.+(js|jsx|mjs|ts|tsx)$/,
                // loader: defaultLoaders.babel,
                include: (pathToTest) => {
                    const isParsed = extensionPaths.some((extensionPath) => extensionPath.test(pathToTest));

                    // if (isParsed) {
                    //     console.log('PARSING: ', pathToTest);
                    // }

                    return isParsed;
                },
                loader: 'babel-loader',
                options: {
                    sourceType: 'module',
                    presets: [
                        [
                            'babel-preset-react-app',
                            {
                                runtime: 'classic'
                            }
                        ]
                    ],
                    plugins: [
                        '@scandipwa/nextjs-extensibility/build-config/babel-plugin-middleware-decorator',
                        '@babel/plugin-transform-arrow-functions',
                        '@babel/plugin-transform-async-to-generator'
                    ]
                }

            });

            // So the middleware is coming from define, inside, it is using the ScandiPlugins
            // ScandiPlugins require parser bellow

            // config.module.rules.unshift({
            //     test: new RegExp('@scandipwa/nextjs-extensibility/runtime-helpers'),
            //     loader: '@scandipwa/nextjs-extensibility/build-config/webpack-extension-import-loader'
            // });
            // ===================================

            // Important: return the modified config
            return config;
        },
        distDir: 'build'
    };
};

// Add new babel loader => "Identifier 'React' has already been declared"
// Add new babel loader + pass in only expression in plugin => "Cannot use import statement outside a module"
// Default loader + pass in only expression in plugin => "Cannot use import statement outside a module"
// Default loader => "Cannot use import statement outside a module"