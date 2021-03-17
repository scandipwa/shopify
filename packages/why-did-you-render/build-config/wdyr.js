const {
    getLoaders,
    loaderByName
} = require('@scandipwa/craco');

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            if (process.env.NODE_ENV !== 'development') {
                // process only in development mode
                return webpackConfig;
            }

            webpackConfig.module.rules.push({
                test: webpackConfig.entry,
                loader: require.resolve('./wydr-import-loader')
            });

            const {
                hasFoundAny: hasAnyBabelLoaders,
                matches: babelLoaders
            } = getLoaders(webpackConfig, loaderByName('babel-loader'));

            if (!hasAnyBabelLoaders) {
                return webpackConfig;
            }

            for (let i = 0; i < babelLoaders.length; i++) {
                const { loader: { options } } = babelLoaders[i];

                const index = options.presets.findIndex(
                    (preset) => preset[0].includes('babel-preset-react-app')
                );

                if (index === -1) {
                    // eslint-disable-next-line no-continue
                    continue;
                }

                options.presets[index][1].importSource = '@welldone-software/why-did-you-render';
            }

            return webpackConfig;
        }
    }
};
