import { createElement } from 'react';

import LineItems from '../component/LineItems';

const addAddToCartAndQuantityRender = (member) => {
    const LINE_ITEMS_POSITION = 500;
    // TODO: use Suspense here
    member.addItem(() => createElement(LineItems), 'cartPageLineItems', LINE_ITEMS_POSITION);
    return member;
};

export default {
    'ShopifyCheckout/Component/CartPage/Component/CartPageComponent': {
        'member-property': {
            sortedRenderList: addAddToCartAndQuantityRender
        }
    }
};
