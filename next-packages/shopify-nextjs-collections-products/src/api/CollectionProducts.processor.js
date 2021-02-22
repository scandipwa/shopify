/* eslint-disable no-param-reassign */
import { processProduct } from '@scandipwa/shopify-nextjs-products/src/api/Products.processor';

/** @namespace ShopifyCollectionsProducts/Api/CollectionProducts/Processor/processCollectionProducts */
export const processCollectionProducts = ({ collectionByHandle }) => {
    const { products } = collectionByHandle;
    const { edges } = products;
    edges.forEach(({ node }) => {
        processProduct(node);
    });

    return collectionByHandle;
};
