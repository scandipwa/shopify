/* eslint-disable no-param-reassign */
import NextPageProvider from '@scandipwa/nextjs-framework/src/context/NextPage.provider';
import {
    BAD_REQUEST_ERROR_CODE,
    handleError,
    NOT_FOUND_ERROR_CODE
} from '@scandipwa/shopify-nextjs-api/src/util/responseHandler';

import { requestPage } from '../api/Page.request';
import PagePageComponent from '../component/PagePage';

const getServerSideProps = async ([{ query: { handle }, res }]) => {
    try {
        const page = await requestPage(handle);

        if (!page) {
            return handleError(res, NOT_FOUND_ERROR_CODE, { page: null });
        }

        return { props: { page } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { page: null });
    }
};

const PagesHandle = ([{ page, responseData = {} }]) => (
    <NextPageProvider props={ { page, responseData } }>
        <PagePageComponent />
    </NextPageProvider>
);

export default {
    'Pages/pages/[handle]/Page': {
        function: PagesHandle
    },
    'Pages/pages/[handle]/getServerSideProps': {
        function: getServerSideProps
    }
};
