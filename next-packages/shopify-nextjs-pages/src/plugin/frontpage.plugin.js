import { requestPage } from '../api/Page.request';
import FrontPagePageComponent from '../component/FrontPagePage';

const FRONT_PAGE_HANDLE = 'frontpage';

const getServerSideProps = async () => {
    const page = await requestPage(FRONT_PAGE_HANDLE);
    return { props: { page } };
};

const FrontPage = ([{ page }]) => (
    <FrontPagePageComponent
      page={ page }
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
