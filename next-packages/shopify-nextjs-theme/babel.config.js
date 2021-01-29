/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
// const alias = require('@scandipwa/scandipwa-scripts/lib/alias');

module.exports = {
    presets: [
        [
            'next/babel',
            {
                'preset-react': {
                    runtime: 'classic'
                }
            }
        ]
    ],
    plugins: [
        // ===================================
        // Extensibility imports
        '@scandipwa/nextjs-extensibility/build-config/babel-plugin-middleware-decorator',
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-transform-async-to-generator'
        // ===================================
    ]
};
