/* eslint-disable no-param-reassign */
import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_ERROR_CODE } from '@scandipwa/shopify-nextjs-api/src/util/responseCodes';

import { requestPage } from '../api/Page.request';
import FrontPagePageComponent from '../component/FrontPagePage';

const FRONT_PAGE_HANDLE = 'frontpage';

const getServerSideProps = async ([{ res }]) => {
    try {
        const page = await requestPage(FRONT_PAGE_HANDLE);

        if (!page) {
            res.statusCode = NOT_FOUND_ERROR_CODE;
            const responseData = { errorCode: NOT_FOUND_ERROR_CODE };

            return { props: { page: null, responseData } };
        }

        return { props: { page } };
    } catch (error) {
        const responseData = { errorCode: INTERNAL_SERVER_ERROR_CODE };
        return { props: { page: null, responseData } };
    }
};

const FrontPage = ([{ page, responseData = {} }]) => (
    <FrontPagePageComponent
      page={ page }
      responseData={ responseData }
    />
);

export default {
    'Pages/index/Page': {
        function: FrontPage
    },
    'Pages/index/getServerSideProps': {
        function: getServerSideProps
    }
};
