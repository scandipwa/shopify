/* eslint-disable */
import renderEmptyPage from '@scandipwa/nextjs-scripts/lib/empty-page';

/**
 * ! This file is a "placeholder" / injection point generated,
 * ! so that the NextJS static router (and Babel plugin) would
 * ! recognize this file as a page. You can override this page
 * ! behaviour using plugin system!
 */

/** @namespace <%= namespace %> */
const Page = () => (
    process.env.NODE_ENV === 'production'
        ? null
        : renderEmptyPage(JSON.parse('<%- emptyPageArgs %>'))
);

/** @namespace <%= static_namespace %> */
const getStaticProps = () => ({ props: {} });

export { getStaticProps };
export default Page;
