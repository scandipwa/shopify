const logger = require('@scandipwa/scandipwa-dev-utils/logger');

/* eslint-disable no-param-reassign */
const getWebpack = (cwds = [__dirname]) => {
    try {
        const webpack = require.resolve('webpack', { paths: cwds });
        return require(webpack);
    } catch (err) {
        return null;
    }
}

const extUtilsDefinition = {
    ExtUtils: [
        '@scandipwa/scandipwa-extensibility/ExtUtils',
        'default'
    ]
};

// Provide ExtUtils globally
const provideGlobals = (webpackConfig, webpack) => {
    const providePlugin = webpackConfig.plugins.find(
        (one) => one instanceof webpack.ProvidePlugin
    );

    // Handle plugin already defined
    if (providePlugin) {
        Object.assign(providePlugin.definitions, extUtilsDefinition);
        
    // Handle not defined -> define
    } else {
        if (!webpack) {
            logger.error(
                'Webpack injection has been triggered, but webpack cannot be found',
                'Please provide webpack in the injector\'s options'
            );

            process.exit(1);
        }

        webpackConfig.plugins.push(
            new webpack.ProvidePlugin(extUtilsDefinition)
        );
    }

    return webpackConfig;
};

module.exports = provideGlobals;
