/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import CollectionsFallbackPage from '../component/CollectionsFallbackPage';

const CollectionsPage = lazy(() => import('../component/CollectionsPage'));

const addCollectionsPage = (member) => {
    const COLLECTIONS_PAGE_POSITION = 1500;

    member.addRendererToPosition(
        () => createElement(Route, {
            path: '/collections',
            exact: true,
            render: (props) => (
                // eslint-disable-next-line react/jsx-no-bind
                <Suspense fallback={ <CollectionsFallbackPage /> }>
                    <CollectionsPage { ...props } />
                </Suspense>
            )
        }),
        COLLECTIONS_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addCollectionsPage
        }
    }
};
