/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import AccountFallbackPage from '../component/AccountFallbackPage';

const AccountPage = lazy(() => import('../component/AccountPage'));

const addCartPage = (member) => {
    const ACCOUNT_PAGE_POSITION = 5000;

    member.addItem(
        () => createElement(Route, {
            path: [
                '/account',
                '/account/:page'
            ],
            exact: true,
            render: (props) => (
                <Suspense fallback={ <AccountFallbackPage /> }>
                    <AccountPage { ...props } />
                </Suspense>
            )
        }),
        'routerAccountPage',
        ACCOUNT_PAGE_POSITION
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
