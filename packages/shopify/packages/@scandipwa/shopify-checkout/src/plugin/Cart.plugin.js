/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { lazy, Suspense } from 'react';

import PageFallbackPage from '../component/CartFallbackPage';

const PagePage = lazy(() => import('../component/CartPage'));

const addCollectionsPage = (member) => [
    ...member,
    {
        position: 100,
        path: '/cart',
        exact: true,
        render: (props) => (
            // eslint-disable-next-line react/jsx-no-bind
            <Suspense fallback={ <PageFallbackPage /> }>
                <PagePage { ...props } />
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
