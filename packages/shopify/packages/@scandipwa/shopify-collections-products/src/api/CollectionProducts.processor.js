/* eslint-disable no-param-reassign */
import { processProduct } from '@scandipwa/shopify-products/src/api/Products.processor';

/** @namespace ShopifyCollection-Products/Api/CollectionProducts/Processor/processCollectionProduct */
export const processCollectionProduct = (product, collectionHandle) => {
    const { handle } = product;

    product.linkTo = {
        pathname: `/collections/${ collectionHandle }/products/${ handle }`,
        state: {
            product
        }
    };
};

/** @namespace ShopifyCollection-Products/Api/CollectionProducts/Processor/collectionProductsResponseProcessor */
export const collectionProductsResponseProcessor = ({ collectionByHandle }) => {
    const { products, handle } = collectionByHandle;
    const { edges } = products;
    edges.forEach(({ node }) => {
        processProduct(node);
        processCollectionProduct(node, handle);
    });

    return products;
};