/**
 * This file is injected into the ScandiPWA application this module is a part of.
 * During the build time it gets processed by a loader from this module.
 * This loader replaces the INJECT__HOOK with all of the necessary imports.
 */
import generateConfig from './generateConfig';

export const extensions = [];

console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
console.log(process.env.SCANDI_PLUGINS);
console.log(process.env.SCANDI_PLUGINS.map((pathname) => require(pathname)));
console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');

export default generateConfig(extensions);
