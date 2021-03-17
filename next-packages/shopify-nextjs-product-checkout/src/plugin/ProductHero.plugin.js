import { createElement } from 'react';

import ProductAddToCart from '../component/ProductAddToCart';
import ProductQuantity from '../component/ProductQuantity';

const addAddToCartAndQuantityRender = (member) => {
    const ADD_TO_CART_POSITION = 1900;
    const QUANTITY_POSITION = 1850;
    // TODO: use Suspense here
    member.addItemToPosition(() => createElement(ProductQuantity), QUANTITY_POSITION);
    member.addItemToPosition(() => createElement(ProductAddToCart), ADD_TO_CART_POSITION);

    return member;
};

export default {
    'ShopifyNextjsProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addAddToCartAndQuantityRender
        }
    }
};
