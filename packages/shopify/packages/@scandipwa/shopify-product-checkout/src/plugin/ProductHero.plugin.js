import { PRODUCT_HERO_DESCRIPTION } from '@scandipwa/shopify-products/src/component/ProductHero/ProductHero.config';

import ProductAddToCart from '../component/ProductAddToCart';

const addOptionsRender = (member) => {
    member.insertEntryBefore(PRODUCT_HERO_DESCRIPTION, ['add-to-cart', () => (
        <ProductAddToCart />
    )]);

    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderMap: addOptionsRender
        }
    }
};
