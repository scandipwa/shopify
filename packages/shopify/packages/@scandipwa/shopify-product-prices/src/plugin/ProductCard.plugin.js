import ProductCardPrice from '../component/ProductCardPrice';

const addPriceRender = (member) => {
    member.set('price', () => (
        <ProductCardPrice />
    ));

    return member;
};

export default {
    'ShopifyProducts/Component/ProductCard/Component/ProductCardComponent': {
        'member-property': {
            sortedRenderMap: addPriceRender
        }
    }
};
