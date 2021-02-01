/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

// nothing will work without the line bellow
// eslint-disable-next-line no-undef
console.log(ExtUtils);

/** @namespace ShopifyNextjsTheme/Pages/Index/getServerSideProps */
const getServerSideProps = async () => (
    // console.log(context);
    { props: { page: {} } }
);

/** @namespace ShopifyNextjsTheme/Pages/Index/Index */
const Index = () => (
    <div>
        test
    </div>
);

export {
    getServerSideProps,
    Index
};

export default Index;
