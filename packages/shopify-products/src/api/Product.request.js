import ShopifyClient from '../util/ShopifyClient';
import { processProductByHandleResponse, processProductsResponse } from './Products.processor';
import getProductQueryByType, { PAGINATED_PRODUCTS, SINGLE_PRODUCT } from './Products.query';

/** @namespace ShopifyProducts/Api/Product/Request/requestProductByHandle */
export const requestProductByHandle = async (handle) => {
    const query = getProductQueryByType(SINGLE_PRODUCT)({ handle });

    const response = await ShopifyClient.postQuery(query);

    return processProductByHandleResponse(response);
};

export const AMOUNT_OF_PRODUCTS = 20;

/** @namespace ShopifyProducts/Api/Product/Request/requestPaginatedProducts */
export const requestPaginatedProducts = async ({ first = AMOUNT_OF_PRODUCTS, before, after }) => {
    const query = getProductQueryByType(PAGINATED_PRODUCTS)({ first, before, after });

    const response = await ShopifyClient.postQuery(query);

    return processProductsResponse(response);
};
