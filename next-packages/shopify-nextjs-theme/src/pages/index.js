/* eslint-disable react/prop-types */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

import { requestPage } from '@scandipwa/shopify-nextjs-pages/src/api/Page.request';
import FrontPagePageComponent from '@scandipwa/shopify-nextjs-pages/src/component/FrontPagePage';

// nothing will work without the line bellow
// eslint-disable-next-line no-undef
// console.log(ExtUtils);

const FRONT_PAGE_HANDLE = 'frontpage';

/** @namespace ShopifyNextjsTheme/Pages/Index/getServerSideProps */
const getServerSideProps = async () => {
    const page = await requestPage(FRONT_PAGE_HANDLE);
    return { props: { page } };
};

/** @namespace ShopifyNextjsTheme/Pages/Index/Index */
const FrontPage = ({ page }) => (
    <FrontPagePageComponent
      page={ page }
    />
);

export {
    getServerSideProps,
    FrontPage
};

export default FrontPage;
