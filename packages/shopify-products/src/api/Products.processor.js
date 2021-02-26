/* eslint-disable no-param-reassign */

/**
 * The single product processor. Returns void, instead it modifies the passed argument.
 * @extPoint Great place to add some "calculated" field into product
 * @extExample ([product], callback) => {
 *     callback(product);
 *     product.myField = product.id + product.handle;
 * }
 * @namespace ShopifyProducts/Api/Products/Processor/processProduct
 */
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

/**
 * The product-list query response processor (from edges and nodes creates an array of products)
 * @namespace ShopifyProducts/Api/Products/Processor/processProductsResponse
 */
export const processProductsResponse = ({ products }) => {
    const { edges } = products;
    edges.forEach(({ node }) => processProduct(node));
    return products;
};

/**
 * The single product query response processor
 * @namespace ShopifyProducts/Api/Products/Processor/processProductByHandleResponse
 */
export const processProductByHandleResponse = ({ productByHandle }) => {
    processProduct(productByHandle);
    return productByHandle;
};
