import { createElement } from 'react';

import ProductAddToCart from '../component/ProductAddToCart';
import ProductQuantity from '../component/ProductQuantity';

const addAddToCartAndQuantityRender = (member) => {
    const ADD_TO_CART_POSITION = 1900;
    const QUANTITY_POSITION = 1850;
    // TODO: use Suspense here
    member.addItem(() => createElement(ProductQuantity), 'productHeroQuantity', QUANTITY_POSITION);
    member.addItem(() => createElement(ProductAddToCart), 'productHeroAddToCart', ADD_TO_CART_POSITION);
    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addAddToCartAndQuantityRender
        }
    }
};
