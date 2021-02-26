/* eslint-disable no-param-reassign */
/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
const { taffy } = require('taffydb');
const path = require('path');
const glob = require('glob');

class Plugin {
    onHandleDocs(ev) {
        this._docs = ev.data.docs;
    }

    onPublish(ev) {
        this._option = ev.data.option || {};
        this._exec(this._docs, ev.data.writeFile, ev.data.copyFile);
    }

    _find(...cond) {
        return this._data(...cond).order('name asec').map((v) => v);
    }

    _findClassDocs(doc) {
        const cond = {
            kind: ['member', 'get', 'set', 'method', 'constructor'],
            memberof: doc.longname
        };

        return this._find(cond).filter((v) => !v.builtinExternal);
    }

    _getExtensibilityContent(doc, namespace, example) {
        if (!example) {
            return [];
        }

        const getPluginType = () => {
            switch (doc.kind) {
            case 'member':
                if (doc.static) {
                    return 'static-member';
                }

                return 'member-properties';
            case 'method':
                if (doc.static) {
                    return 'static-member';
                }

                return 'member-function';
            case 'class':
                return 'class';
            default:
                return 'function';
            }
        };

        const type = getPluginType();
        const formattedExample = example.replace(/\n/gm, '\n                ');

        if (type === 'function' || type === 'class') {
            return [
                '```javascript',
                '{',
                `    '${ namespace }': {`,
                `        '${ type }': ${ formattedExample }`,
                '    }',
                '}',
                '```'
            ];
        }

        return [
            '```javascript',
            '{',
            `    '${ namespace }': {`,
            `        '${ type }': {`,
            `            '${ doc.name }': ${ formattedExample }`,
            '        }',
            '    }',
            '}',
            '```'
        ];
    }

    _getContentForDoc(doc, importPath, namespace) {
        const {
            unknown = [],
            examples = [],
            description,
            kind
        } = doc;

        const content = [];

        content.push(description, '\n');

        if (examples.length > 0) {
            content.push('**Usage examples** \n');

            examples.forEach((example) => {
                const replacedExample = example.replace(/%filename%/gm, importPath);
                content.push('```javascript', replacedExample, '```');
            });
        }

        let extensionPoint = '';
        let extensionExample = '';

        unknown.forEach((comments) => {
            const { tagName, tagValue } = comments;

            switch (tagName) {
            case '@namespace': {
                content.push('**Namespace**', '```javascript', tagValue, '```');
                namespace = tagValue;
                break;
            }
            case '@extPoint': {
                extensionPoint = tagValue;
                break;
            }
            case '@extExample': {
                extensionExample = tagValue;
                break;
            }
            default: {
                break;
            }
            }
        });

        if (extensionPoint || extensionExample) {
            content.push('**Common extension point** \n', extensionPoint);
            content.push(...this._getExtensibilityContent(doc, namespace, extensionExample));
        }

        switch (kind) {
        case 'class': {
            const subDocs = this._findClassDocs(doc, importPath);

            content.push('**Methods and properties**', '\n');

            for (let i = 0; i < subDocs.length; i++) {
                const subDoc = subDocs[i];

                if (!subDoc.description) {
                    continue;
                }

                const type = `${ subDoc.static ? 'static ' : '' }${ subDoc.async ? 'async ' : '' }${ subDoc.kind }`;
                content.push(`- *${ type }* \`${ subDoc.name }\``, '\n');
                content.push(this._getContentForDoc(subDoc, importPath, namespace).map((e) => `    ${e}`).join('\n'));
            }

            break;
        }
        default: {
            break;
        }
        }

        return content;
    }

    _exec(tags, writeFile, copyFile) {
        this._data = taffy(tags);
        this._tags = tags;

        /* const files = this._find({ kind: ['file'] });
        const classes = this._find({ kind: ['class'] }); */

        const moduleDirs = new Map();
        const kinds = ['class', 'interface', 'function', 'variable', 'typedef', 'external'];

        for (const doc of this._tags) {
            if (
                !kinds.includes(doc.kind)
                || doc.builtinExternal
                || doc.ignore
            ) {
                continue;
            }

            const filePath = doc.memberof.replace(/^.*?[/]/, '');
            const dirPath = path.dirname(filePath);
            const moduleDir = dirPath.split(path.sep)[0];

            if (!moduleDirs.has(moduleDir)) {
                moduleDirs.set(moduleDir, new Map());
            }

            const dirDocs = moduleDirs.get(moduleDir);

            if (!dirDocs.has(dirPath)) {
                dirDocs.set(dirPath, []);
            }

            dirDocs.get(dirPath).push(doc);
        }

        const kindOrder = {
            class: 0,
            interface: 1,
            function: 2,
            variable: 3,
            typedef: 4,
            external: 5
        };

        const modulePaths = Array.from(moduleDirs.keys()).sort((a, b) => (a > b ? 1 : -1));

        modulePaths.forEach((modulePath) => {
            const realPathname = path.join(
                __dirname,
                '..',
                'packages',
                modulePath
            );

            const modulePackage = require(
                path.join(
                    realPathname,
                    'package.json'
                )
            );

            const content = ['# Internal structure'];

            const dirDocs = moduleDirs.get(modulePath);
            const dirPaths = Array.from(dirDocs.keys()).sort((a, b) => (a > b ? 1 : -1));

            for (let k = 0; k < dirPaths.length; k++) {
                const dirPath = dirPaths[k];
                const docs = dirDocs.get(dirPath);

                const sortedDocs = docs.sort((a, b) => {
                    const kindA = a.interface ? 'interface' : a.kind;
                    const kindB = b.interface ? 'interface' : b.kind;

                    if (kindA === kindB) {
                        return a.longname > b.longname ? 1 : -1;
                    }

                    return kindOrder[kindA] > kindOrder[kindB] ? 1 : -1;
                });

                for (let i = 0; i < sortedDocs.length; i++) {
                    const doc = sortedDocs[i];

                    if (!doc.description) {
                        // skip all non-described docs
                        continue;
                    }

                    content.push(`### *${ doc.kind }* \`${ doc.name }\``);
                    const relativeImportPath = doc.importPath.split(path.sep).slice(3).join(path.sep);
                    const importPath = `${ modulePackage.name }/${ relativeImportPath }`;

                    content.push(
                        '```javascript',
                        `import ${ doc.importStyle } from '${ importPath }'`,
                        '```'
                    );

                    content.push(...this._getContentForDoc(doc, importPath));
                    content.push('---');
                }

                if (content.length <= 1) {
                    continue;
                }

                writeFile(
                    path.join('packages', modulePath, 'structure.md'),
                    content.join('\n')
                );

                const packageReadmePath = path.join('packages', modulePath, 'README.md');

                const allMDs = glob.sync('*.md', {
                    cwd: realPathname
                });

                if (allMDs) {
                    allMDs.forEach((MDName) => {
                        copyFile(
                            path.join(realPathname, MDName),
                            path.join('packages', modulePath, MDName)
                        );
                    });
                }

                try {
                    copyFile(
                        path.join(realPathname, 'README.md'),
                        packageReadmePath
                    );
                } catch (e) {
                    writeFile(
                        packageReadmePath,
                        [
                            `# ${ modulePackage.name }`,
                            'This module has not description yet! Create `README.md` to replace this file.'
                        ].join('\n')
                    );
                }
            }
        });
    }
}

module.exports = new Plugin();
