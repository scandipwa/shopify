import ImportedPlugins from '../../runtime-helpers'

/* eslint-disable no-undef */
/**
 * Get `class` plugins for provided namespaces' outer one (last assigned)
 * These plugins cannot be inherited
 * @param {String[]} namespaces
 */
export const withNamespace = (namespaces) => {
    // The last pushed into the namespaces array namespace
    // Is an actual, not an inherited one.
    const outerNamespace = namespaces[namespaces.length - 1];

    try {
        return ImportedPlugins[outerNamespace].class || [];
    } catch (e) {
        return [];
    }
};

export default withNamespace;