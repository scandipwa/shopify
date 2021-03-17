/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import RegisterFallbackPage from '../component/RegisterFallbackPage';

export const RegisterPage = lazy(() => import('../component/RegisterPage'));

export const addRegisterPage = (member) => {
    const REGISTER_PAGE_POSITION = 4500;

    member.addItem(
        () => createElement(Route, {
            path: [
                '/account/register'
            ],
            exact: true,
            render: (props) => (
                <Suspense fallback={ <RegisterFallbackPage /> }>
                    <RegisterPage { ...props } />
                </Suspense>
            )
        }),
        'routerRegisterPage',
        REGISTER_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addRegisterPage
        }
    }
};
