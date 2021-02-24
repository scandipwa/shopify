/* eslint-disable no-param-reassign */
import NextPageProvider from '@scandipwa/nextjs-framework/src/context/NextPage.provider';
import {
    BAD_REQUEST_ERROR_CODE,
    handleError,
    NOT_FOUND_ERROR_CODE
} from '@scandipwa/shopify-nextjs-api/src/util/responseHandler';

import { requestPage } from '../api/Page.request';
import FrontPagePageComponent from '../component/FrontPagePage';

const FRONT_PAGE_HANDLE = 'frontpage';

const getServerSideProps = async ([{ res }]) => {
    try {
        const page = await requestPage(FRONT_PAGE_HANDLE);

        if (!page) {
            return handleError(res, NOT_FOUND_ERROR_CODE, { page: null });
        }

        return { props: { page } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { page: null });
    }
};

const FrontPage = ([{ page, responseData = {} }]) => (
    <NextPageProvider props={ { page, responseData } }>
        <FrontPagePageComponent />
    </NextPageProvider>
);

export default {
    'Pages/index/Page': {
        function: FrontPage
    },
    'Pages/index/getServerSideProps': {
        function: getServerSideProps
    }
};
