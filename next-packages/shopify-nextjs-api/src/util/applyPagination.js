/** @namespace ShopifyNextjsApi/Util/ApplyPagination/addPaginationArguments */
export const addPaginationArguments = ({
    first, last, before, after, field
}) => {
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
