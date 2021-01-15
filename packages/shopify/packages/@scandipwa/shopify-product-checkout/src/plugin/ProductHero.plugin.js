import { createElement } from 'react';

import ProductAddToCart from '../component/ProductAddToCart';

const addOptionsRender = (member) => {
    const OPTIONS_POSITION = 1900;
    member.addRendererToPosition(() => createElement(ProductAddToCart), OPTIONS_POSITION);
    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addOptionsRender
        }
    }
};
