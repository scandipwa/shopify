/* eslint-disable no-param-reassign */

/** @namespace ShopifyProducts/Api/Products/Processor/processProduct */
export const processProduct = (product) => {
    const { handle, images: { edges } } = product;

    product.linkTo = {
        pathname: `/products/${ handle }`,
        state: {
            product
        }
    };

    product.images = edges.map(({ node }) => node);
};

/** @namespace ShopifyProducts/Api/Products/Processor/processProductsResponse */
export const processProductsResponse = ({ products }) => {
    const { edges } = products;
    edges.forEach(({ node }) => processProduct(node));
    return products;
};

/** @namespace ShopifyProducts/Api/Products/Processor/processProductByHandleResponse */
export const processProductByHandleResponse = ({ productByHandle }) => {
    processProduct(productByHandle);
    return productByHandle;
};
