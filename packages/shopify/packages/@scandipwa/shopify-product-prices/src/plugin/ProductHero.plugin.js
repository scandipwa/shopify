import { PRODUCT_HERO_DESCRIPTION } from '@scandipwa/shopify-products/src/component/ProductHero/ProductHero.config';

import ProductHeroPrice from '../component/ProductHeroPrice';

const addOptionsRender = (member) => {
    member.insertEntryBefore(PRODUCT_HERO_DESCRIPTION, ['price', () => (
        <ProductHeroPrice />
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
