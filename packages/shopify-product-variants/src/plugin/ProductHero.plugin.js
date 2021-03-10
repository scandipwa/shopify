import { createElement } from 'react';

import ProductOptions from '../component/ProductOptions';

const addOptionsRender = (member) => {
    const OPTIONS_POSITION = 1500;
    // TODO: use Suspense here
    member.addItem(() => createElement(ProductOptions), 'productOptions', OPTIONS_POSITION);
    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addOptionsRender
        }
    }
};
