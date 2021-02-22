/* eslint-disable no-param-reassign */
import {
    BAD_REQUEST_ERROR_CODE,
    handleError,
    NOT_FOUND_ERROR_CODE
} from '@scandipwa/shopify-nextjs-api/src/util/responseHandler';

import { requestProduct, requestProducts } from '../api/Products.request';
import ProductPageComponent from '../component/ProductPage';
import ProductsPageComponent from '../component/ProductsPage';

const getServerSidePropsHandle = async ([{ query, res }]) => {
    try {
        const product = await requestProduct(query);

        if (!product) {
            return handleError(res, NOT_FOUND_ERROR_CODE, { product: null });
        }

        return { props: { product } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { product: null });
    }
};

const getServerSidePropsPaginated = async ([{ query, res }]) => {
    const PRODUCTS_PAGE_SIZE = 10;

    try {
        const productsResponse = await requestProducts({
            ...query,
            last: PRODUCTS_PAGE_SIZE,
            first: PRODUCTS_PAGE_SIZE
        });

        if (!productsResponse) {
            return handleError(res, NOT_FOUND_ERROR_CODE, { productsResponse: null });
        }

        return { props: { productsResponse } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { productsResponse: null });
    }
};

const ProductsHandle = ([{ product, responseData = {} }]) => (
    <ProductPageComponent
      product={ product }
      responseData={ responseData }
    />
);

const ProductsPaginated = ([{ productsResponse, responseData = {} }]) => (
    <ProductsPageComponent
      productsResponse={ productsResponse }
      responseData={ responseData }
    />
);

export default {
    'Pages/products/[handle]/Page': {
        function: ProductsHandle
    },
    'Pages/products/[handle]/getServerSideProps': {
        function: getServerSidePropsHandle
    },
    'Pages/products/Page': {
        function: ProductsPaginated
    },
    'Pages/products/getServerSideProps': {
        function: getServerSidePropsPaginated
    }
};
