import FrontPagePageComponent from '../component/FrontPagePage/FrontPagePage.component';

const renderFrontPage = (args) => {
    const [{ page }] = args;

    return (
        <FrontPagePageComponent />
    );
};

export default {
    'ShopifyNextjsTheme/Pages/Index/Index': {
        function: renderFrontPage
    }
};
