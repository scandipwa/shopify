/* eslint-disable no-param-reassign */
import { requestPage } from '../api/Page.request';
import PagePageComponent from '../component/PagePage';

const getServerSideProps = async ([{ query: { handle }, res }]) => {
    try {
        const page = await requestPage(handle);

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
