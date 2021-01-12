/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { lazy, Suspense } from 'react';

import ProductsFallbackPage from '../component/ProductsFallbackPage';

const ProductsPage = lazy(() => import('../component/ProductsPage'));

const addProductsPage = (member) => [
    ...member,
    {
        position: 90,
        path: [
            '/collections/all'
        ],
        exact: true,
        render: (props) => (
            // eslint-disable-next-line react/jsx-no-bind
            <Suspense fallback={ <ProductsFallbackPage /> }>
                <ProductsPage { ...props } />
            </Suspense>
        )
    }
];

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            switchRoutesList: addProductsPage
        }
    }
};
