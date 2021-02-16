import { postQuery } from '@scandipwa/shopify-nextjs-api/src/api/request';

import { processProductByHandleResponse, processProductsResponse } from './Products.processor';
import getProductQueryByType, { PAGINATED_PRODUCTS, SINGLE_PRODUCT } from './Products.query';

/** @namespace ShopifyNextjsProducts/Api/Products/Request/requestProduct */
export const requestProduct = async (handle) => {
    const queryGetter = getProductQueryByType(SINGLE_PRODUCT);
    const responseProcessor = processProductByHandleResponse;
    const response = await postQuery(queryGetter({ handle }));
    const product = responseProcessor(response);
    return product;
};

/** @namespace ShopifyNextjsProducts/Api/Products/Request/requestProducts */
export const requestProducts = async ({
    first, last, before, after
}) => {
    const queryGetter = getProductQueryByType(PAGINATED_PRODUCTS);
    const responseProcessor = processProductsResponse;
    const response = await postQuery(queryGetter({
        first, last, before, after
    }));
    const products = responseProcessor(response);
    return products;
};
