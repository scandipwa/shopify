/* eslint-disable no-param-reassign */
import NextPageProvider from '@scandipwa/nextjs-framework/src/context/NextPage.provider';
import {
    BAD_REQUEST_ERROR_CODE,
    handleError,
    NOT_FOUND_ERROR_CODE
} from '@scandipwa/shopify-nextjs-api/src/util/responseHandler';

import { requestCollection, requestCollections } from '../api/Collections.request';
import CollectionPageComponent from '../component/CollectionPage';
import CollectionsPageComponent from '../component/CollectionsPage';

const getServerSidePropsHandle = async ([{ query, res }]) => {
    try {
        const collection = await requestCollection(query);

        if (!collection) {
            return handleError(res, NOT_FOUND_ERROR_CODE, { collection: null });
        }

        return { props: { collection } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { collection: null });
    }
};

const getServerSidePropsPaginated = async ([{ query, res }]) => {
    const COLLECTIONS_PAGE_SIZE = 10;

    try {
        const collectionsResponse = await requestCollections({
            ...query,
            last: COLLECTIONS_PAGE_SIZE,
            first: COLLECTIONS_PAGE_SIZE
        });

        if (!collectionsResponse) {
            return handleError(res, NOT_FOUND_ERROR_CODE, { collectionsResponse: null });
        }

        return { props: { collectionsResponse } };
    } catch (error) {
        return handleError(res, BAD_REQUEST_ERROR_CODE, { collectionsResponse: null });
    }
};

const CollectionsHandle = ([{ collection, responseData = {} }]) => (
    <NextPageProvider props={ { collection, responseData } }>
        <CollectionPageComponent />
    </NextPageProvider>
);

const CollectionsPaginated = ([{ collectionsResponse, responseData = {} }]) => (
    <NextPageProvider props={ { collectionsResponse, responseData } }>
        <CollectionsPageComponent />
    </NextPageProvider>
);

export default {
    'Pages/collections/[handle]/Page': {
        function: CollectionsHandle
    },
    'Pages/collections/[handle]/getServerSideProps': {
        function: getServerSidePropsHandle
    },
    'Pages/collections/Page': {
        function: CollectionsPaginated
    },
    'Pages/collections/getServerSideProps': {
        function: getServerSidePropsPaginated
    }
};
