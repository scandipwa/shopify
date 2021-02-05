/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

const spawn = require('cross-spawn');

module.exports = (script) => {
    // eslint-disable-next-line fp/no-let
    let child = null;

    /**
     * Added path to hard-coded CRACO configuration file
     */
    const spawnUndead = (isRestarted = false) => {
        child = spawn(
            require.resolve('next/dist/bin/next'),

        );
    };
};
