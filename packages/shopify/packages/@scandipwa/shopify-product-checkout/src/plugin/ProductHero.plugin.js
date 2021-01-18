import { createElement } from 'react';

import ProductAddToCart from '../component/ProductAddToCart';
import ProductQuantity from '../component/ProductQuantity';

const addAddToCartAndQuantityRender = (member) => {
    const ADD_TO_CART_POSITION = 1900;
    const QUANTITY_POSITION = 1850;
    member.addRendererToPosition(() => createElement(ProductQuantity), QUANTITY_POSITION);
    member.addRendererToPosition(() => createElement(ProductAddToCart), ADD_TO_CART_POSITION);
    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addAddToCartAndQuantityRender
        }
    }
};
