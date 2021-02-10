/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy } from 'react';
// import CheckoutWebButton from '../component/CheckoutWebButton';

const CheckoutWebButton = lazy(() => import('../component/CheckoutWebButton'));

const checkoutWebButtonRender = (member) => {
    const CHECKOUT_WEB_BUTTON_POSITION = 501;
    member.addItemToPosition(() => createElement(CheckoutWebButton), CHECKOUT_WEB_BUTTON_POSITION);

    return member;
};

export default {
    'ShopifyCheckout/Component/CartPage/Component/CartPageComponent': {
        'member-property': {
            sortedRenderList: checkoutWebButtonRender
        }
    }
};
