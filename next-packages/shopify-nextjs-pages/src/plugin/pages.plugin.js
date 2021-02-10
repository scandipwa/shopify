import { requestPage } from '../api/Page.request';
import PagePageComponent from '../component/PagePage';

const getServerSideProps = async ([{ query: { handle } }]) => {
    try {
        const page = await requestPage(handle);

        return { props: { page } };
    } catch (error) {
        // TODO: Figure out a way to handle and display API errors
        return { props: { page: null, error: true } };
    }
};

const PagesHandle = ([{ page }]) => (
    <PagePageComponent
      page={ page }
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
