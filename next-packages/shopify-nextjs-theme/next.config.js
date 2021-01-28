/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

// const FallbackPlugin = require('@scandipwa/webpack-fallback-plugin');
// const { sources } = require('@scandipwa/scandipwa-scripts/lib/sources');
// const url = require('url');
// const path = require('path');
const extensions = require('@scandipwa/scandipwa-dev-utils/extensions');

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
                        REBEM_ELEM_DELIM: JSON.stringify('-')
                    }
                })
            ]);

            // Allow importing .ts and .tsx files without specifying the extension
            config.resolve.extensions.push('.ts');
            config.resolve.extensions.push('.tsx');

            // Allow everything to be processed by babel
            // eslint-disable-next-line fp/no-delete
            delete config.module.rules[0].exclude;
            // eslint-disable-next-line fp/no-delete
            // delete config.module.rules[0].include;

            config.module.rules[0].include.push(
                // [BABEL] unknown: Preset /* your preset */ requires a filename to be set when babel is called directly
                ...extensions.map(({ packagePath }) => packagePath)
            );

            // Add FallbackPlugin
            // config.resolve.plugins.push(new FallbackPlugin({ sources }));

            // Allow importing .style files without specifying the extension
            // config.resolve.extensions.push('.scss');

            // if (fs.existsSync(abstractStyle)) {
            //     config.module.rules.push({
            //         enforce: 'pre',
            //         test: /\.scss$/,
            //         loader: 'sass-resources-loader',
            //         options: {
            //             resources: abstractStyle
            //         }
            //     });
            // }

            // ===================================
            // Extensibility imports

            // TODO:
            // - patched to include GlobalThis (THIS IS NOT REAL IN NODE)
            // - pathced no imports in entry
            // - possibly pre-compile runtime-modules
            // (NextJS) does not support optional chaining

            // if (!imports) {
            //     return [
            //         injectableCode,
            //         source
            //     ].join('');
            // }

            config.plugins.forEach((plugin) => {
                if (plugin instanceof webpack.ProvidePlugin) {
                    plugin.definitions.middleware = [
                        require.resolve('@scandipwa/nextjs-extensibility/middleware'),
                        'default'
                    ];

                    plugin.definitions.Extensible = [
                        require.resolve('@scandipwa/nextjs-extensibility/Extensible'),
                        'default'
                    ];

                    plugin.definitions.ScandiPlugins = [
                        require.resolve('@scandipwa/nextjs-extensibility/runtime-helpers/index.js'),
                        'default'
                    ];
                }
            });

            config.module.rules.push({
                test: require.resolve('@scandipwa/nextjs-extensibility/runtime-helpers/index.js'),
                loader: require.resolve('@scandipwa/nextjs-extensibility/build-config/webpack-extension-import-loader')
            });

            // Trying to prove module with extnesions
            // if (typeof config.entry === 'function') {
            //     const entrypoints = process.binding('util').getPromiseDetails(config.entry())[1];

            //     const allPath = Object.entries(entrypoints)
            //         .filter(([key]) => !(key.includes('react') || key.includes('polyfills')))
            //         .map((([_, value]) => (
            //             Array.isArray(value) ? value[1] : value)
            //         ));

            //     const test = allPath
            //         .filter(
            //             Boolean
            //         ).map(
            //             (testCondition) => {
            //                 const temp = path.resolve(testCondition);
            //                 const { pathname } = url.parse(temp);
            //                 return pathname;
            //             }
            //         );

            //     if (test.length) {
            //         config.module.rules.push({
            //             test,
            //             loader: require.resolve('@scandipwa/nextjs-extensibility/build-config/webpack-extension-import-helper-loader')
            //         });
            //     }
            // } else {
            //     config.module.rules.push({
            //         test: config.entry,
            //         loader: require.resolve('@scandipwa/nextjs-extensibility/build-config/webpack-extension-import-helper-loader')
            //     });
            // }

            // ===================================

            // Important: return the modified config
            return config;
        },
        distDir: 'build'
    };
};
