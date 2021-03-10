/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
const babel = require('@babel/core');

function transformImports(code, transformer) {
    const parts = [];
    babel.transformSync(code, {
        presets: ['@babel/preset-react'],
        plugins: [
            {
                visitor: {
                    ImportDeclaration({
                        node: {
                            source: {
                                start,
                                end
                            }
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
                            start: node.arguments[0].start,
                            end: node.arguments[0].end
                        });
                    }
                }
            }
        ]
    });

    return parts.concat(null)
        .reduce(({
            lastIndex,
            result
        }, part) => {
            // end of file
            if (!part) {
                return { result: result.concat(code.substr(lastIndex)) };
            }
            const {
                start,
                end
            } = part;
            const importSource = code.substring(start, end);
            return {
                lastIndex: end,
                result: [
                    ...result,
                    code.substring(lastIndex, start),
                    importSource.replace(/[`'"]([^`'"]+)[`'"]/, (match, value) => {
                        const resolvedModulePath = transformer(value);

                        return `"${ resolvedModulePath }"`;
                    })
                ]
            };
        }, {
            lastIndex: 0,
            result: []
        })
        .result
        .join('');
}

module.exports = transformImports;
