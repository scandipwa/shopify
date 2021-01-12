/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { lazy, Suspense } from 'react';

import CollectionsFallbackPage from '../component/CollectionsFallbackPage';

const CollectionsPage = lazy(() => import('../component/CollectionsPage'));

const addCollectionsPage = (member) => [
    ...member,
    {
        position: 10,
        path: '/collections',
        exact: true,
        render: (props) => (
            // eslint-disable-next-line react/jsx-no-bind
            <Suspense fallback={ <CollectionsFallbackPage /> }>
                <CollectionsPage { ...props } />
            </Suspense>
        )
    }
];

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            switchRoutesList: addCollectionsPage
        }
    }
};
