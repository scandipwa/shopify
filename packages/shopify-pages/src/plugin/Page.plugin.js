/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import PageFallbackPage from '../component/PageFallbackPage';

const PagePage = lazy(() => import('../component/PagePage'));

const addPagePage = (member) => {
    const PAGE_PAGE_POSITION = 4000;

    member.addItemToPosition(
        () => createElement(Route, {
            path: '/pages/:handle',
            exact: true,
            render: (props) => (
            // eslint-disable-next-line react/jsx-no-bind
            <Suspense fallback={ <PageFallbackPage /> }>
                <PagePage { ...props } />
            </Suspense>
            )
        }),
        PAGE_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addPagePage
        }
    }
};
