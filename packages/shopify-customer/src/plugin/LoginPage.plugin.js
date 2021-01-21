/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import LoginFallbackPage from '../component/LoginFallbackPage';

const LoginPage = lazy(() => import('../component/LoginPage'));

const addCartPage = (member) => {
    const LOGIN_PAGE_POSITION = 4500;

    member.addItemToPosition(
        () => createElement(Route, {
            path: [
                '/account/login'
            ],
            exact: true,
            render: (props) => (
                // eslint-disable-next-line react/jsx-no-bind
                <Suspense fallback={ <LoginFallbackPage /> }>
                    <LoginPage { ...props } />
                </Suspense>
            )
        }),
        LOGIN_PAGE_POSITION
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
