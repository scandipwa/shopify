/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import CollectionFallbackPage from '../component/CollectionFallbackPage';

const CollectionPage = lazy(() => import('../component/CollectionPage'));

const addCollectionPage = (member) => {
    const COLLECTION_PAGE_POSITION = 2000;

    member.addItem(
        () => createElement(Route, {
            path: '/collections/:handle',
            exact: true,
            render: (props) => (
                <Suspense fallback={ <CollectionFallbackPage /> }>
                    <CollectionPage { ...props } />
                </Suspense>
            )
        }),
        'routerCollectionPage',
        COLLECTION_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addCollectionPage
        }
    }
};
