import getWrapperFromPlugin from '../helpers/getWrapperFromPlugin';

/**
 * Middlewaring given original member
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
export default (origMember = () => {}, sortedPlugins, origContext) => (...args) => {
    const newMember = sortedPlugins.reduce(
        (acc, plugin) => () => {
            const wrapper = getWrapperFromPlugin(plugin, origMember.name);

            // Provide different arguments due to API difference
            // Between property and function call interception
            return typeof origMember === 'object'
                ? wrapper(acc, origContext)
                : wrapper(
                    args,
                    acc.bind(origContext),
                    origContext
                );
        },
        origMember
    );

    return newMember(args);
};
