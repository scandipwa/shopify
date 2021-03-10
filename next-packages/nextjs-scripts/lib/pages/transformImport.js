/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
const babel = require('@babel/core');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');

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
                        const sourceArg = node.arguments[0];
                        if (sourceArg.type !== 'StringLiteral') {
                            const warningCode = logger.style.code(code.substring(node.start, node.end));
                            logger.warn(
                                `Critical dependency found: "${ warningCode }".`,
                                'It is not recommended to import modules in such a manner, it may not work as expected.'
                            );

                            return;
                        }
                        parts.push({
                            start: sourceArg.start,
                            end: sourceArg.end
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
            const importSource = code.substring(start + 1, end - 1);
            return {
                lastIndex: end,
                result: [
                    ...result,
                    code.substring(lastIndex, start),
                    `"${ transformer(importSource) }"`
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
