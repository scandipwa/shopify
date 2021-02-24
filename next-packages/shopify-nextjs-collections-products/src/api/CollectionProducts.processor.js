/* eslint-disable no-param-reassign */
import { processProduct } from '@scandipwa/shopify-nextjs-products/src/api/Products.processor';

/** @namespace ShopifyCollectionsProducts/Api/CollectionProducts/Processor/processCollectionProduct */
export const processCollectionProduct = (collectionHandle, product) => {
    const { handle: productHandle } = product;

    product.linkTo = {
        pathname: `/collections/${ collectionHandle }/products/${ productHandle }`
    };

    return product;
};

/** @namespace ShopifyCollectionsProducts/Api/CollectionProducts/Processor/processCollectionProducts */
export const processCollectionProducts = ({ collectionByHandle }) => {
    const { products, handle } = collectionByHandle;
    const { edges } = products;
    edges.forEach(({ node }) => {
        processProduct(node);
        processCollectionProduct(handle, node);
    });

    return collectionByHandle;
};
