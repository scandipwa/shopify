/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
// const path = require('path');
const getAllExtensionImports = require('../webpack-extension-import-loader');

/**
 * This will import the neighboring runtime-helpers into the application
 * The import will be the last import in the application's entry point
 * But it will occur before ReactDOM.render()
 */
module.exports = function injectImports(source) {
    // const injectablePath = path.resolve(__dirname, '..', '..', 'runtime-helpers');
    const injectableCode = `ExtUtils.setPlugins([${ getAllExtensionImports() }]);\n`;

    return [
        injectableCode,
        source
    ].join('');
};
