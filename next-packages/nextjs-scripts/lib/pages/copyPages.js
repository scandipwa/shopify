/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const transformImports = require('./transformImport');
const { getParentThemePaths } = require('@scandipwa/scandipwa-dev-utils/parent-theme');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const extensions = require('@scandipwa/scandipwa-dev-utils/extensions');

const copiedPages = {};

const copyPages = async (rootDir, projectRoot) => {
    const themePaths = getParentThemePaths(rootDir);
    const extensionsPaths = extensions.map(({ packagePath }) => packagePath);
    const possiblePaths = [
        rootDir,
        ...themePaths,
        ...extensionsPaths
    ].map(
        // we only allow pages inside of the src folder!
        (pathname) => path.join(pathname, 'src')
    );

    const pagePathsPromise = possiblePaths.map(
        (source) => new Promise((resolve, reject) => {
            glob('pages/**/*', {
                cwd: source,
                absolute: true
            }, (err, files) => {
                if (err) {
                    reject(err);
                }

                resolve(files);
            });
        })
    );

    const pages = (await Promise.all(pagePathsPromise)).reduce(
        (acc, sourcePagePaths) => {
            // eslint-disable-next-line fp/no-let
            for (let i = 0; i < sourcePagePaths.length; i++) {
                const sourcePagePath = sourcePagePaths[i];
                const match = sourcePagePath.match(/[/\\]pages[/\\](.*)\.\D{2,3}/);

                if (!match) {
                    // eslint-disable-next-line no-continue
                    continue;
                }

                const [, pageRoute] = match;

                // ignore invalid paths
                if (!pageRoute) {
                    // eslint-disable-next-line no-continue
                    continue;
                }

                if (!acc[pageRoute]) {
                    acc[pageRoute] = sourcePagePath;
                    // eslint-disable-next-line no-continue
                    continue;
                }

                logger.warn(
                    `The page ${ logger.style.file(pageRoute) } has two or more sources:`,
                    `    1) ${ logger.style.file(acc[pageRoute]) }`,
                    `    2) ${ logger.style.file(sourcePagePath) }`,
                    // TODO: remove when Fallback Plugin is added
                    'Using the 1) implementation.'
                );
            }

            return acc;
        },
        {}
    );

    Object.entries(pages)
        .map(([key, sourceFile]) => {
            // we need collect source file and target file for later usages
            const targetFile = path.join(projectRoot, 'pages', `${ key }.js`);
            copiedPages[sourceFile] = targetFile;
            return [
                sourceFile,
                targetFile
            ];
        })
        .forEach(([sourceFile, targetFile]) => {
            const sourceCode = fs.readFileSync(sourceFile, 'utf-8');
            const transformedSource = transformImports(sourceCode, (value) => {
                const resolvedPath = require.resolve(value, {
                    paths: [value[0] === '.' ? path.dirname(sourceFile) : rootDir]
                });

                return copiedPages[resolvedPath] || resolvedPath;
            });

            fs.writeFileSync(targetFile, transformedSource);
        });
};

module.exports = copyPages;
