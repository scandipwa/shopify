import { createElement } from 'react';

import ProductOptions from '../component/ProductOptions';

const addOptionsRender = (member) => {
    const PRICE_POSITION = 1500;
    // TODO: use Suspense here
    member.addItemToPosition(() => createElement(ProductOptions), PRICE_POSITION);
    return member;
};

export default {
    'ShopifyNextjsProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addOptionsRender
        }
    }
};