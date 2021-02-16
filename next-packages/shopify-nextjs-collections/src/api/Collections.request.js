import { postQuery } from '@scandipwa/shopify-nextjs-api/src/api/request';

import { processCollectionByHandleResponse, processCollectionsResponse } from './Collections.processor';
import getCollectionQueryOfType, { PAGINATED_COLLECTIONS, SINGLE_COLLECTION } from './Collections.query';

/** @namespace ShopifyNextjsCollections/Api/Collections/Request/requestCollection */
export const requestCollection = async (handle) => {
    const queryGetter = getCollectionQueryOfType(SINGLE_COLLECTION);
    const responseProcessor = processCollectionByHandleResponse;
    const response = await postQuery(queryGetter({ handle }));
    const collection = responseProcessor(response);
    return collection;
};

/** @namespace ShopifyNextjsCollections/Api/Collections/Request/requestCollections */
export const requestCollections = async ({
    first, last, before, after
}) => {
    const queryGetter = getCollectionQueryOfType(PAGINATED_COLLECTIONS);
    const responseProcessor = processCollectionsResponse;
    const response = await postQuery(queryGetter({
        first, last, after, before
    }));
    const collections = responseProcessor(response);
    return collections;
};
