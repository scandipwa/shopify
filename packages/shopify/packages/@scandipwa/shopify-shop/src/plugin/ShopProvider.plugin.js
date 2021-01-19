import ShopProvider from '../context/Shop.provider';

const addShopProvider = (member) => [
    ...member,
    (children) => (
        <ShopProvider>
            { children }
        </ShopProvider>
    )
];

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProviders: addShopProvider
        }
    }
};
