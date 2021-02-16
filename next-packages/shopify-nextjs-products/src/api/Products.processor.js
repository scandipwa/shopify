/* eslint-disable no-param-reassign */

/** @namespace ShopifyNextjsProducts/Api/Products/Processor/processProduct */
export const processProduct = (product) => {
    if (!product) {
        return null;
    }

    const { handle, images: { edges } } = product;

    product.images = edges.map(({ node }) => node);
    product.linkTo = {
        pathname: `/products/${ handle }`
    };

    return product;
};

/** @namespace ShopifyNextjsProducts/Api/Products/Processor/processProductsResponse */
export const processProductsResponse = ({ products }) => {
    const { edges } = products;
    edges.forEach(({ node }) => processProduct(node));
    return products;
};

/** @namespace ShopifyNextjsProducts/Api/Products/Processor/processProductByHandleResponse */
export const processProductByHandleResponse = ({ productByHandle }) => {
    processProduct(productByHandle);
    return productByHandle;
};
