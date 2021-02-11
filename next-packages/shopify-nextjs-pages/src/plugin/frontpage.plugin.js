/* eslint-disable no-param-reassign */
import { requestPage } from '../api/Page.request';
import FrontPagePageComponent from '../component/FrontPagePage';

const FRONT_PAGE_HANDLE = 'frontpage';

const getServerSideProps = async ([{ res }]) => {
    try {
        const page = await requestPage(FRONT_PAGE_HANDLE);

        if (!page) {
            res.statusCode = 404;
            const responseData = { errorCode: 404 };

            return { props: { page: null, responseData } };
        }

        return { props: { page } };
    } catch (error) {
        const responseData = { errorCode: 400 };
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
