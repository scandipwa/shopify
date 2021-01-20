import { createElement } from 'react';

import ProductCardPrice from '../component/ProductCardPrice';

const addPriceRender = (member) => {
    const PRICE_POSITION = 2500;
    // TODO: use Suspense here
    member.addRendererToPosition(() => createElement(ProductCardPrice), PRICE_POSITION);
    return member;
};

export default {
    'ShopifyProducts/Component/ProductCard/Component/ProductCardComponent': {
        'member-property': {
            sortedRenderList: addPriceRender
        }
    }
};
