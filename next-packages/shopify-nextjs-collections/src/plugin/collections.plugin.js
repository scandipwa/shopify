/* eslint-disable no-param-reassign */
import { requestCollection, requestCollections } from '../api/Collections.request';
import CollectionPageComponent from '../component/CollectionPage';
import CollectionsPageComponent from '../component/CollectionsPage';

const NOT_FOUND_ERROR_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 400;

const getServerSidePropsHandle = async ([{ query: { handle }, res }]) => {
    try {
        const collection = await requestCollection(handle);

        if (!collection) {
            res.statusCode = NOT_FOUND_ERROR_CODE;
            const responseData = { errorCode: NOT_FOUND_ERROR_CODE };

            return { props: { collection: null, responseData } };
        }

        return { props: { collection } };
    } catch (error) {
        const responseData = { errorCode: INTERNAL_SERVER_ERROR_CODE };

        return { collection: null, responseData };
    }
};

const getServerSidePropsPaginated = async ([{ query: { after, before }, res }]) => {
    const COLLECTIONS_PAGE_SIZE = 10;

    try {
        const collectionsResponse = await requestCollections({
            after,
            before,
            last: COLLECTIONS_PAGE_SIZE,
            first: COLLECTIONS_PAGE_SIZE
        });

        if (!collectionsResponse) {
            res.statusCode = NOT_FOUND_ERROR_CODE;
            const responseData = { errorCode: NOT_FOUND_ERROR_CODE };

            return { props: { collectionsResponse: null, responseData } };
        }

        return { props: { collectionsResponse } };
    } catch (error) {
        const responseData = { errorCode: INTERNAL_SERVER_ERROR_CODE };

        return { props: { collectionsResponse: null, responseData } };
    }
};

const CollectionsHandle = ([{ collection, responseData = {} }]) => (
    <CollectionPageComponent
      collection={ collection }
      responseData={ responseData }
    />
);

const CollectionsPaginated = ([{ collectionsResponse, responseData = {} }]) => (
    <CollectionsPageComponent
      collectionsResponse={ collectionsResponse }
      responseData={ responseData }
    />
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
