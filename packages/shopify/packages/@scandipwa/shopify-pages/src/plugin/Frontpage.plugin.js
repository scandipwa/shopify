/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { lazy, Suspense } from 'react';

import FrontPageFallbackPage from '../component/FrontPageFallbackPage';

const FrontPagePage = lazy(() => import('../component/FrontPagePage'));

const addCollectionsPage = (member) => [
    ...member,
    {
        position: 1,
        path: '/',
        exact: true,
        render: (props) => (
            // eslint-disable-next-line react/jsx-no-bind
            <Suspense fallback={ <FrontPageFallbackPage /> }>
                <FrontPagePage { ...props } />
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
