/* eslint-disable no-param-reassign */

/** @namespace ShopifyCollections/Api/Collections/Processor/processCollection */
export const processCollection = (collection) => {
    const { handle } = collection;

    collection.linkTo = {
        pathname: `/collections/${ handle }`,
        state: {
            collection
        }
    };
};

/** @namespace ShopifyCollections/Api/Collections/Processor/processCollections */
export const processCollections = ({ edges }) => {
    edges.forEach(({ node }) => processCollection(node));
};
