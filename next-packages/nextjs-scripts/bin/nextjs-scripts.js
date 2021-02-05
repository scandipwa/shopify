#!/usr/bin/env node
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

const runNextJS = require('../lib/nextjs');
// const linkExtensions = require('../lib/link-extensions');

const args = process.argv.slice(2);

const scriptMap = {
    start: runNextJS,
    build: runNextJS,
    dev: runNextJS
    // link: linkExtensions
};

const script = args[0];
scriptMap[script](script);
