/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement } from 'react';

import CheckoutWebButton from '../component/CheckoutWebButton';

const checkoutWebButtonRender = (member) => {
    const CHECKOUT_WEB_BUTTON_POSITION = 501;
    member.addItemToPosition(() => createElement(CheckoutWebButton), CHECKOUT_WEB_BUTTON_POSITION);

    return member;
};

export default {
    'ShopifyNextjsCheckout/Component/CartPage/Component/CartPageComponent': {
        'member-property': {
            sortedRenderList: checkoutWebButtonRender
        }
    }
};
