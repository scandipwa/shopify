/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
/* eslint-disable react/prop-types */
import { requestPage } from '@scandipwa/shopify-nextjs-pages/src/api/Page.request';
import PagePageComponent from '@scandipwa/shopify-nextjs-pages/src/component/PagePage';

/** @namespace ShopifyNextjsTheme/Pages/Pages/[Handle]/getServerSideProps */
const getServerSideProps = async ({ query: { handle } }) => {
    const page = await requestPage(handle);
    return { props: { page } };
};

/** @namespace ShopifyNextjsTheme/Pages/Pages/[Handle]/PagesHandle */
const PagesHandle = ({ page }) => (
    <PagePageComponent
      page={ page }
    />
);

export {
    PagesHandle,
    getServerSideProps
};

export default PagesHandle;
