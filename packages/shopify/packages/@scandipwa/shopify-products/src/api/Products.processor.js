/* eslint-disable no-param-reassign */

/** @namespace ShopifyProducts/Api/Products/Processor/processProduct */
export const processProduct = (product) => {
    const { handle } = product;

    product.linkTo = {
        pathname: `/products/${ handle }`,
        state: {
            product
        }
    };
};

/** @namespace ShopifyProducts/Api/Products/Processor/processProductsResponse */
export const processProductsResponse = ({ products }) => {
    const { edges } = products;
    edges.forEach(({ node }) => processProduct(node));
    return products;
};

/** @namespace ShopifyProducts/Api/Products/Processor/processProductByHandleResponse */
export const processProductByHandleResponse = ({ productByHandle }) => productByHandle;
