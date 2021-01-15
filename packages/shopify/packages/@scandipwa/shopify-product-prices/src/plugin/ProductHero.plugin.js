import { createElement } from 'react';

import ProductHeroPrice from '../component/ProductHeroPrice';

const addOptionsRender = (member) => {
    const PRICE_POSITION = 1100;
    member.addRendererToPosition(() => createElement(ProductHeroPrice), PRICE_POSITION);
    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addOptionsRender
        }
    }
};
