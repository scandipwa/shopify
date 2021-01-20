/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import PageFallbackPage from '../component/CartFallbackPage';

const PagePage = lazy(() => import('../component/CartPage'));

const addCartPage = (member) => {
    const CART_PAGE_POSITION = 1000;

    member.addRendererToPosition(
        () => createElement(Route, {
            path: '/cart',
            exact: true,
            render: (props) => (
                // eslint-disable-next-line react/jsx-no-bind
                <Suspense fallback={ <PageFallbackPage /> }>
                    <PagePage { ...props } />
                </Suspense>
            )
        }),
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
