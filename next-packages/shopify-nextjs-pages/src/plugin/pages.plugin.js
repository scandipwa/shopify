/* eslint-disable no-param-reassign */
import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_ERROR_CODE } from '@scandipwa/shopify-nextjs-api/src/util/responseCodes';

import { requestPage } from '../api/Page.request';
import PagePageComponent from '../component/PagePage';

const getServerSideProps = async ([{ query: { handle }, res }]) => {
    try {
        const page = await requestPage(handle);

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

const PagesHandle = ([{ page, responseData = {} }]) => (
    <PagePageComponent
      page={ page }
      responseData={ responseData }
    />
);

export default {
    'Pages/pages/[handle]/Page': {
        function: PagesHandle
    },
    'Pages/pages/[handle]/getServerSideProps': {
        function: getServerSideProps
    }
};
