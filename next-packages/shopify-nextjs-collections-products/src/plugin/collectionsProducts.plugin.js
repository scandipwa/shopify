import NextPageProvider from '@scandipwa/nextjs-framework/src/context/NextPage.provider';
import {
    BAD_REQUEST_ERROR_CODE,
    handleError,
    NOT_FOUND_ERROR_CODE
} from '@scandipwa/shopify-nextjs-api/src/util/responseHandler';
import { requestProduct } from '@scandipwa/shopify-nextjs-products/src/api/Products.request';
import ProductPageComponent from '@scandipwa/shopify-nextjs-products/src/component/ProductPage';

const getServerSidePropsHandle = async ([{ query, res }]) => {
    try {
        const { productHandle } = query;
        const formattedQuery = {
            ...query,
            handle: productHandle
        };
        const product = await requestProduct(formattedQuery);

        if (!product) {
            return handleError(res, NOT_FOUND_ERROR_CODE, { product: null });
        }

        return { props: { product } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { product: null });
    }
};

const ProductsHandle = ([{ product, responseData = {} }]) => (
    <NextPageProvider props={ { product, responseData } }>
        <ProductPageComponent />
    </NextPageProvider>
);

export default {
    'Pages/collections/[handle]/products/[productHandle]/Page': {
        function: ProductsHandle
    },
    'Pages/collections/[handle]/products/[productHandle]/getServerSideProps': {
        function: getServerSidePropsHandle
    }
};
