/** @namespace ShopifyCollections/Api/Collections/Processor/processCollection */
export const processCollection = (collection) => {
    const { handle } = collection;

    return {
        ...collection,
        linkTo: {
            pathname: `/collections/${ handle }`,
            state: {
                collection
            }
        }
    };
};

/** @namespace ShopifyCollections/Api/Collections/Processor/processCollections */
export const processCollections = ({ edges, pageInfo }) => ({
    edges: edges.map(({ cursor, node }) => ({
        cursor,
        node: processCollection(node)
    })),
    pageInfo
});
