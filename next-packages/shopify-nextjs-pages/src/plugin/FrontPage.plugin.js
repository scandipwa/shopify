/* eslint-disable react/prop-types */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
import { requestPage } from '../api/Page.request';
import FrontPagePageComponent from '../component/FrontPagePage';

const FRONT_PAGE_HANDLE = 'frontpage';

const getServerSideProps = async () => {
    const page = await requestPage(FRONT_PAGE_HANDLE);

    return { props: { page } };
};

const frontPage = ([{ page }]) => (
    <FrontPagePageComponent
      page={ page }
    />
);

export default {
    'ShopifyNextjsTheme/Pages/Index/getServerSideProps': {
        function: getServerSideProps
    },
    'ShopifyNextjsTheme/Pages/Index/Index': {
        function: frontPage
    }
};
