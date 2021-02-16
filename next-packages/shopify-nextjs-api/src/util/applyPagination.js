/** @namespace ShopifyNextjsApi/Util/ApplyPagination/addPaginationArguments */
export const addPaginationArguments = ({
    first, last, before, after, field
}) => {
    // Similar code is going to be used for other modules
    // We might want to define it as a helper for further reusage
    if (first && after) {
        field
            .addArgument('after', 'String', after)
            .addArgument('first', 'Int', first);
    } else if (last && before) {
        field
            .addArgument('before', 'String', before)
            .addArgument('last', 'Int', last);
    } else {
        field
            .addArgument('first', 'Int', first);
    }

    return field;
};
