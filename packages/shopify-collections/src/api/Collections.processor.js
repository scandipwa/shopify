/* eslint-disable no-param-reassign */

/**
 * The single product processor. Returns void, instead it modifies the passed argument.
 * @extPoint Great place to add some "calculated" field into collection
 * @extExample ([collection], callback) => {
 *     callback(collection);
 *     collection.myField = collection.id + collection.handle;
 * }
 * @namespace ShopifyCollections/Api/Collections/Processor/processCollection
 */
export const processCollection = (collection) => {
    const { handle } = collection;

    collection.linkTo = {
        pathname: `/collections/${ handle }`,
        state: {
            collection
        }
    };
};

/**
 * The collection-list query response processor (from edges and nodes creates an array of collections)
 * @namespace ShopifyCollections/Api/Collections/Processor/collectionsResponseProcessor
 */
export const collectionsResponseProcessor = ({ collections }) => {
    const { edges } = collections;
    edges.forEach(({ node }) => processCollection(node));
    return collections;
};

/**
 * The single collection query response processor
 * @namespace ShopifyCollections/Api/Collections/Processor/processCollectionByHandleResponse
 */
export const processCollectionByHandleResponse = ({ collectionByHandle }) => collectionByHandle;
