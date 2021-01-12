/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { lazy, Suspense } from 'react';

import PageFallbackPage from '../component/PageFallbackPage';

const PagePage = lazy(() => import('../component/PagePage'));

const addCollectionsPage = (member) => [
    ...member,
    {
        position: 100,
        path: '/pages/:handle',
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
