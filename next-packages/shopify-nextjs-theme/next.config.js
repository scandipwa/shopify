/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

const path = require('path');
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

                // new CircularDependencyPlugin()
            ]);

            // ===================================
            // EXTENSIBILITY SPECIFIC FEATURES
            // ===================================

            const PATH_DELIMITER = '[\\\\/]'; // match 2 antislashes or one slash
            const safePath = (module) => module.split('/').join(PATH_DELIMITER);

            const extensionPaths = [
                ...extensions.map(({ packagePath }) => new RegExp(packagePath)),
                ...extensions.map(({ packageName }) => new RegExp(safePath(packageName)))
            ];

            // eslint-disable-next-line fp/no-delete
            delete config.module.rules[0].exclude;
            config.module.rules[0].include.push(...extensionPaths);

            config.plugins.forEach((plugin) => {
                if (plugin instanceof webpack.ProvidePlugin) {
                    plugin.definitions.ExtUtils = [
                        '@scandipwa/nextjs-extensibility/ExtUtils',
                        'default'
                    ];
                }
            });

            config.resolve.symlinks = false;

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

            config.module.rules.push({
                test: new RegExp('_app'),
                loader: require.resolve('@scandipwa/nextjs-extensibility/build-config/webpack-extension-import-helper-loader')
            });
            // ===================================

            // Important: return the modified config
            return config;
        },
        webpackDevMiddleware(config) {
            // const ignored = config.watchOptions.ignored.filter(
            //     (regexp) => /[\\/]node_modules[\\/]/.test(regexp)
            // ).concat(excludes);

            // config.watchOptions.ignored = ignored;

            // TODO: add smarted watch options
            // console.log(config);

            return config;
        },
        distDir: 'build'
    };
};

// Add new babel loader => "Identifier 'React' has already been declared"
// Add new babel loader + pass in only expression in plugin => "Cannot use import statement outside a module"
// Default loader + pass in only expression in plugin => "Cannot use import statement outside a module"
// Default loader => "Cannot use import statement outside a module"
