import FrontPagePage from '../component/FrontPagePage';

console.log('||||||||||||||||||||||||||||||||||');
console.log(ScandiPlugins);
console.log(middleware);
console.log(Extensible);
console.log('||||||||||||||||||||||||||||||||||');

const renderFrontPage = () => (
    <FrontPagePage />
);

export default {
    'ShopifyNextjsTheme/Pages/Index/Index': {
        function: renderFrontPage
    }
};

/* eslint-disable @scandipwa/scandipwa-guidelines/derived-class-names */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-one-class */
/* eslint-disable max-classes-per-file */
