const path = require('path');

/**
 * This will import the WDYR into the application
 * The import will be the first import in the application's entry point
 */
module.exports = function injectImports(source) {
    const injectablePath = path.resolve(__dirname, '..', '..', 'src', 'wdyr.js');
    const injectableCode = `import '${injectablePath}';\n`;

    const importMatcher = /^import .+$/gm;
    const imports = source.match(importMatcher);

    const firstImport = imports[0];
    const firstImportPosition = source.indexOf(firstImport);

    const codeBeforeInjectable = source.slice(0, firstImportPosition);
    const codeAfterInjectable = source.slice(firstImportPosition);

    const injectedCode = [
        codeBeforeInjectable,
        injectableCode,
        codeAfterInjectable
    ].join('');

    return injectedCode;
};
