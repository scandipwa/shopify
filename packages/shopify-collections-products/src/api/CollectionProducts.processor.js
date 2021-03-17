/* eslint-disable no-param-reassign */
import { processProduct } from '@scandipwa/shopify-products/src/api/Products.processor';

/**
 * Single collection product processor. Returns void, instead it modifies the passed argument.
 * @namespace ShopifyCollectionsProducts/Api/CollectionProducts/Processor/processCollectionProduct */
export const processCollectionProduct = (product, collectionHandle) => {
    const { handle } = product;

    product.linkTo = {
        pathname: `/collections/${ collectionHandle }/products/${ handle }`,
        state: {
            product
        }
    };
};

/**
 * Processess products within collections. Returns void, instead it modifies the passed argument.
 * @namespace ShopifyCollectionsProducts/Api/CollectionProducts/Processor/collectionProductsResponseProcessor */
export const collectionProductsResponseProcessor = ({ collectionByHandle }) => {
    const { products, handle } = collectionByHandle;
    const { edges } = products;
    edges.forEach(({ node }) => {
        processProduct(node);
        processCollectionProduct(node, handle);
    });

    return products;
};
