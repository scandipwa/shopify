import ImportedPlugins from '../../runtime-helpers'

/* eslint-disable no-undef */
/**
 * Get plugins for provided namespaces
 * @param {String[]} namespaces
 * @param {String} targetSpecifier
 * @param {String} memberName
 */
export const withNamespace = (namespaces, targetSpecifier, memberName) => namespaces.reduce(
    (acc, namespace) => {
        // Handle no member name: return all plugins for the provided section
        if (!memberName) {
            try {
                const pluginsOfType = ImportedPlugins[namespace][targetSpecifier];

                if (pluginsOfType) {
                    return acc.concat(pluginsOfType);
                }
            } catch (e) {
                // ingore the error
            }
        } else {
            try {
                // Handle member name present
                const { value } = Object.getOwnPropertyDescriptor(
                    ImportedPlugins[namespace][targetSpecifier] || {},
                    memberName
                ) || {};

                if (value) {
                    return acc.concat(value);
                }
            } catch (e) {
                // ingore the error
            }
        }

        return acc;
    }, []
);

export default withNamespace;