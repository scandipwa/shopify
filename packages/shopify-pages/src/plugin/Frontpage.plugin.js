/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import FrontPageFallbackPage from '../component/FrontPageFallbackPage';

const FrontPagePage = lazy(() => import('../component/FrontPagePage'));

const addFrontPage = (member) => {
    const FRONT_PAGE_POSITION = 3000;

    member.addItem(
        () => createElement(Route, {
            path: '/',
            exact: true,
            render: (props) => (
                <Suspense fallback={ <FrontPageFallbackPage /> }>
                    <FrontPagePage { ...props } />
                </Suspense>
            )
        }),
        'routerFrontPage',
        FRONT_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addFrontPage
        }
    }
};
