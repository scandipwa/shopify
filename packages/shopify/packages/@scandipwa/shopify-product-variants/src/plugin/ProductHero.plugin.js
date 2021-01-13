import { PRODUCT_HERO_DESCRIPTION } from '@scandipwa/shopify-products/src/component/ProductHero/ProductHero.config';

import ProductOptions from '../component/ProductOptions';

const addOptionsRender = (member) => {
    member.insertEntryBefore(PRODUCT_HERO_DESCRIPTION, ['key', () => (
        <ProductOptions />
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
