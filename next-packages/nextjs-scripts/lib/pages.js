/* eslint-disable no-continue,max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
const { getParentThemePaths } = require('@scandipwa/scandipwa-dev-utils/parent-theme');
const extensions = require('@scandipwa/scandipwa-dev-utils/extensions');
const { getPackageJson } = require('@scandipwa/scandipwa-dev-utils/package-json');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const createFilesystem = require('@scandipwa/scandipwa-dev-utils/create-filesystem');
const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

function transformImports(source, tranformer) {
    const parts = [];
    babel.transformSync(source, {
        presets: ['@babel/preset-react'],
        plugins: [
            {
                visitor: {
                    ImportDeclaration({
                        node: {
                            start,
                            end
                        }
                    }) {
                        parts.push({
                            start,
                            end
                        });
                    },
                    CallExpression({ node }) {
                        if (
                            node.callee.type !== 'Import' && node.callee.name !== 'require'
                        ) {
                            return;
                        }
                        parts.push({
                            start: node.start,
                            end: node.end
                        });
                    }
                }
            }
        ]
    });
    const result = [];
    // eslint-disable-next-line fp/no-let
    let lastIndex = 0;
    while (parts.length) {
        const {
            start,
            end
        } = parts.shift();

        result.push(source.substring(lastIndex, start));
        const code = source.substring(start, end);
        result.push(
            code.replace(/[`'"]([^`'"]+)[`'"]/, (match, value) => {
                const resolvedModulePath = tranformer(value);

                return `"${resolvedModulePath}"`;
            })
        );
        lastIndex = end;
    }

    return result.join('') + source.substr(lastIndex);
}

const getDefinedPages = async (rootDir) => {
    // TODO: use Fallback plugin here!!!
    const themePaths = getParentThemePaths(rootDir);
    const extensionsPaths = extensions.map(({ packagePath }) => packagePath);

    const validTypes = [
        // https://nextjs.org/docs/basic-features/pages#server-side-rendering
        'server',
        // https://nextjs.org/docs/basic-features/pages#static-generation-without-data
        'static-no-data',
        // https://nextjs.org/docs/basic-features/pages#static-generation-with-data
        'static-with-data'
    ];

    const pages = [
        rootDir,
        ...themePaths,
        ...extensionsPaths
    ].reduce(
        // we only allow pages inside of the src folder!
        (acc, pathname) => {
            const { scandipwa: { nextPages = {} } = {} } = getPackageJson(pathname);

            // eslint-disable-next-line fp/no-let
            for (let i = 0; i < Object.entries(nextPages).length; i++) {
                const [page, type] = Object.entries(nextPages)[i];

                if (validTypes.indexOf(type) === -1) {
                    logger.error(
                        `The declared page ${logger.style.file(page)} type ${logger.style.code(type)} is invalid.`,
                        'At the moment, we only support:',
                        `    - ${logger.style.code('static-no-data')} (Static Generation without data, ${logger.style.link('https://nextjs.org/docs/basic-features/pages#static-generation-without-data')})`,
                        `    - ${logger.style.code('static-with-data')} (Static Generation with data, ${logger.style.link('https://nextjs.org/docs/basic-features/pages#static-generation-with-data')})`,
                        `    - ${logger.style.code('server')} (Server-side Rendering, ${logger.style.link('https://nextjs.org/docs/basic-features/pages#server-side-rendering')})`
                    );

                    process.exit();
                }

                if (acc[page]) {
                    logger.warn(`The page ${logger.style.file(page)} has two or more declarations.`);

                    if (acc[page] !== type) {
                        logger.error(
                            'The declared page types do not match. Recieved following types:',
                            `    - ${type}`,
                            `    - ${acc[page]}`,
                            `Please define ${logger.style.misc('one and only one')} type per page.`
                        );

                        process.exit();
                    }

                    continue;
                }

                acc[page] = type;
            }

            return acc;
        },
        {}
    );

    return pages;
};

const createMockPages = (pages, projectRoot) => createFilesystem(
    path.join(projectRoot, 'pages'),
    path.join(__dirname, 'template'),
    (
        filesystem,
        templatePath,
        destinationPath
    ) => {
        // clear pages directory
        glob.sync('pages/**/*.js', {
            cwd: projectRoot,
            absolute: true
        })
            .forEach(
                (file) => fs.unlinkSync(file)
            );

        // regenerate it using the template
        Object.entries(pages)
            .forEach(([page, type]) => {
                const namespaces = {
                    namespace: `Pages/${page}/Page`,
                    static_namespace: `Pages/${page}/getStaticProps`,
                    server_namespace: `Pages/${page}/getServerSideProps`
                };

                filesystem.copyTpl(
                    templatePath(`${type}.js`),
                    destinationPath(`${page}.js`),
                    {
                        emptyPageArgs: JSON.stringify({
                            type,
                            page,
                            namespaces
                        }),
                        ...namespaces
                    }
                );
            });
    }
);

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
                    continue;
                }

                const [, pageRoute] = match;

                // ignore invalid paths
                if (!pageRoute) {
                    continue;
                }

                if (!acc[pageRoute]) {
                    acc[pageRoute] = sourcePagePath;
                    continue;
                }

                logger.warn(
                    `The page ${logger.style.file(pageRoute)} has two or more sources:`,
                    `    1) ${logger.style.file(acc[pageRoute])}`,
                    `    2) ${logger.style.file(sourcePagePath)}`,
                    // TODO: remove when Fallback Plugin is added
                    'Using the 1) implementation.'
                );
            }

            return acc;
        },
        {}
    );

    Object.entries(pages)
        .forEach(([key, sourceFile]) => {
            const source = fs.readFileSync(sourceFile, 'utf-8');
            const transformedSource = transformImports(source, (value) => require.resolve(value, {
                paths: [value[0] === '.' ? path.dirname(sourceFile) : rootDir]
            }));

            fs.writeFileSync(path.join(projectRoot, 'pages', `${key}.js`), transformedSource);
        });
};

module.exports = {
    getDefinedPages,
    createMockPages,
    copyPages
};
