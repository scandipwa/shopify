import ShopifyApiProvider from '../context/ShopifyApi.provider';

const addApiClientProvider = (member) => {
    const API_CLIENT_POSITION = 10000;

    member.addItemToPosition((children) => (
        <ShopifyApiProvider>
            { children }
        </ShopifyApiProvider>
    ), API_CLIENT_POSITION);

    return member;
};

export default {
    'NextjsFramework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProvidersRenderList: addApiClientProvider
        }
    }
};
