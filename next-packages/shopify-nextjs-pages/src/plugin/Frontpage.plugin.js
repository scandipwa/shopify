import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import FrontPageFallbackPage from '../component/FrontPageFallbackPage';

const FrontPagePage = lazy(() => import('../component/FrontPagePage'));

const addFrontPage = (member) => {
    const FRONT_PAGE_POSITION = 3000;

    member.addItemToPosition(
        () => createElement(Route, {
            path: '/',
            exact: true,
            render: () => (
                <Suspense fallback={ <FrontPageFallbackPage /> }>
                    <FrontPagePage />
                </Suspense>
            )
        }),
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
