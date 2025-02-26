/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import ProductFallbackPage from '../component/ProductFallbackPage';

const ProductPage = lazy(() => import('../component/ProductPage'));

const addProductPage = (member) => {
    const PRODUCT_PAGE_POSITION = 5000;

    member.addItem(
        () => createElement(Route, {
            path: [
                '/products/:handle',
                '/collections/:collectionHandle/products/:handle'
            ],
            exact: true,
            render: (props) => (
                <Suspense fallback={ <ProductFallbackPage /> }>
                    <ProductPage { ...props } />
                </Suspense>
            )
        }),
        'routerProductPage',
        PRODUCT_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addProductPage
        }
    }
};
