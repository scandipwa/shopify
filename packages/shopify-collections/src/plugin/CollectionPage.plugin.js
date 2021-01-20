/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import CollectionFallbackPage from '../component/CollectionFallbackPage';

const CollectionPage = lazy(() => import('../component/CollectionPage'));

const addCollectionPage = (member) => {
    const COLLECTION_PAGE_POSITION = 2000;

    member.addRendererToPosition(
        () => createElement(Route, {
            path: '/collections/:handle',
            exact: true,
            render: (props) => (
                // eslint-disable-next-line react/jsx-no-bind
                <Suspense fallback={ <CollectionFallbackPage /> }>
                    <CollectionPage { ...props } />
                </Suspense>
            )
        }),
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
