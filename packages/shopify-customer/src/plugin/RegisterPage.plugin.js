/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import RegisterFallbackPage from '../component/RegisterFallbackPage';

export const RegisterPage = lazy(() => import('../component/RegisterPage'));

/** @namespace ShopifyCustomer/Plugin/LoginPage/Plugin Copy/addCartPage */
export const addCartPage = (member) => {
    const REGISTER_PAGE_POSITION = 4500;

    member.addItemToPosition(
        () => createElement(Route, {
            path: [
                '/account/register'
            ],
            exact: true,
            render: (props) => (
                // eslint-disable-next-line react/jsx-no-bind
                <Suspense fallback={ <RegisterFallbackPage /> }>
                    <RegisterPage { ...props } />
                </Suspense>
            )
        }),
        REGISTER_PAGE_POSITION
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
