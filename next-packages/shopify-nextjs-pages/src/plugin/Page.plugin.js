/* eslint-disable react/prop-types */
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
            render: ({ history, match }) => (
                <Suspense fallback={ <PageFallbackPage /> }>
                    <PagePage
                      handle={ match?.params?.handle }
                      cachedPage={ history?.location?.state?.page }
                    />
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
