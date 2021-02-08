import { requestPage } from '../api/Page.request';
import PagePageComponent from '../component/PagePage';

const getServerSideProps = async ([{ query: { handle } }]) => {
    const page = await requestPage(handle);
    return { props: { page } };
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
