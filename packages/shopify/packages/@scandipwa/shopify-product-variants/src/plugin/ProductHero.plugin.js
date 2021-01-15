import { createElement } from 'react';

import ProductOptions from '../component/ProductOptions';

const addOptionsRender = (member) => {
    const PRICE_POSITION = 1500;
    member.addRendererToPosition(() => createElement(ProductOptions), PRICE_POSITION);
    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addOptionsRender
        }
    }
};
