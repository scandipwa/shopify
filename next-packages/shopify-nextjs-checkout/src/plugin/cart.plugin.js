import NextPageProvider from '@scandipwa/nextjs-framework/src/context/NextPage.provider';
import {
    BAD_REQUEST_ERROR_CODE,
    handleError,
    NOT_FOUND_ERROR_CODE
} from '@scandipwa/shopify-nextjs-api/src/util/responseHandler';

import CartPageComponent from '../component/CartPage';

const getServerSidePropsHandle = async ([{ query, res }]) => {
    try {
        return { props: { success: true } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { success: null });
    }
};

const getServerSidePropsPaginated = async ([{ query, res }]) => {
    try {
        return { props: { success: true } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { success: null });
    }
};

const CartPageHandle = ([{ collection, responseData = {} }]) => (
    <NextPageProvider props={ { collection, responseData } }>
        <CartPageComponent />
    </NextPageProvider>
);

const CartPaginated = ([{ collectionsResponse, responseData = {} }]) => (
    <NextPageProvider props={ { collectionsResponse, responseData } }>
        <CartPageComponent />
    </NextPageProvider>
);

export default {
    'Pages/cart/[handle]/Page': {
        function: CartPageHandle
    },
    'Pages/cart/[handle]/getServerSideProps': {
        function: getServerSidePropsHandle
    },
    'Pages/cart/Page': {
        function: CartPaginated
    },
    'Pages/cart/getServerSideProps': {
        function: getServerSidePropsPaginated
    }
};
