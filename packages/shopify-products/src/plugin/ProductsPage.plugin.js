/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import ProductsFallbackPage from '../component/ProductsFallbackPage';

const ProductsPage = lazy(() => import('../component/ProductsPage'));

const addProductsPage = (member) => {
    const PRODUCTS_PAGE_POSITION = 1000;

    member.addItem(
        () => createElement(Route, {
            path: [
                '/collections/all'
            ],
            exact: true,
            render: (props) => (
                <Suspense fallback={ <ProductsFallbackPage /> }>
                    <ProductsPage { ...props } />
                </Suspense>
            )
        }),
        'routerProductsPage',
        PRODUCTS_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addProductsPage
        }
    }
};
