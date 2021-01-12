/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { lazy, Suspense } from 'react';

import ProductFallbackPage from '../component/ProductFallbackPage';

const ProductPage = lazy(() => import('../component/ProductPage'));

const addProductPage = (member) => [
    ...member,
    {
        position: 100,
        path: [
            '/products/:handle',
            '/collections/:collectionHandle/products/:handle'
        ],
        exact: true,
        render: (props) => (
            // eslint-disable-next-line react/jsx-no-bind
            <Suspense fallback={ <ProductFallbackPage /> }>
                <ProductPage { ...props } />
            </Suspense>
        )
    }
];

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            switchRoutesList: addProductPage
        }
    }
};
