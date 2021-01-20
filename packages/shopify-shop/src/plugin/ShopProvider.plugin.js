import ShopProvider from '../context/Shop.provider';

const addShopProvider = (member) => {
    const SHOP_POSITION = 9000;

    member.addRendererToPosition((children) => (
        <ShopProvider>
            { children }
        </ShopProvider>
    ), SHOP_POSITION);

    return member;
};

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProvidersRenderList: addShopProvider
        }
    }
};
