import ShopifyApiProvider from '../context/ShopifyApi.provider';

const addApiClientProvider = (member) => [
    ...member,
    (children) => (
        <ShopifyApiProvider>
            { children }
        </ShopifyApiProvider>
    )
];

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProviders: addApiClientProvider
        }
    }
};
