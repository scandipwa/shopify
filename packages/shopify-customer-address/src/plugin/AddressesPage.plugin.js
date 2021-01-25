/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { createElement, lazy, Suspense } from 'react';
import { Route } from 'react-router';

import AddressesFallbackPage from '../component/AddressesFallbackPage';

const AddressesPage = lazy(() => import('../component/AddressesPage'));

const addAddressesPage = (member) => {
    const ADDRESSES_PAGE_POSITION = 4500;

    member.addItemToPosition(
        () => createElement(Route, {
            path: [
                '/account/addresses'
            ],
            exact: true,
            render: (props) => (
                <Suspense fallback={ <AddressesFallbackPage /> }>
                    <AddressesPage { ...props } />
                </Suspense>
            )
        }),
        ADDRESSES_PAGE_POSITION
    );

    return member;
};

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            _switchRenderList: addAddressesPage
        }
    }
};
