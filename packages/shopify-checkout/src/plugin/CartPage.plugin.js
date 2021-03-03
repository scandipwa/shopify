/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import CartFallbackPage from '../component/CartFallbackPage';

const CartPage = lazy(() => import('../component/CartPage'));

const addCartPage = (member) => {
    const CART_PAGE_POSITION = 1000;

    member.addItem(
        () => createElement(Route, {
            path: '/cart',
            exact: true,
            render: (props) => (
                <Suspense fallback={ <CartFallbackPage /> }>
                    <CartPage { ...props } />
                </Suspense>
            )
        }),
        'routerCartPage',
        CART_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addCartPage
        }
    }
};
