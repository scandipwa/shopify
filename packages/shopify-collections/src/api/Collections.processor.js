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

/** @namespace ShopifyCollections/Api/Collections/Processor/collectionsResponseProcessor */
export const collectionsResponseProcessor = ({ collections }) => {
    const { edges } = collections;
    edges.forEach(({ node }) => processCollection(node));
    return collections;
};

/** @namespace ShopifyCollections/Api/Collections/Processor/processCollectionByHandleResponse */
export const processCollectionByHandleResponse = ({ collectionByHandle }) => collectionByHandle;
