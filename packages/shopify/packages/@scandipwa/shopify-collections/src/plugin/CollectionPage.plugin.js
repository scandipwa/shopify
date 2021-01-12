/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { lazy, Suspense } from 'react';

import CollectionFallbackPage from '../component/CollectionFallbackPage';

const CollectionPage = lazy(() => import('../component/CollectionPage'));

const addCollectionsPage = (member) => [
    ...member,
    {
        position: 10,
        path: '/collections/:handle',
        exact: true,
        render: (props) => (
            // eslint-disable-next-line react/jsx-no-bind
            <Suspense fallback={ <CollectionFallbackPage /> }>
                <CollectionPage { ...props } />
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
