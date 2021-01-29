/* eslint-disable import/first */
console.log('=====================================');
console.log(ExtUtils);
console.log('END OF =====================================');

import FrontPagePage from '../component/FrontPagePage';

const renderFrontPage = () => (
    <FrontPagePage />
);

export default {
    'ShopifyNextjsTheme/Pages/Index/Index': {
        function: renderFrontPage
    }
};
