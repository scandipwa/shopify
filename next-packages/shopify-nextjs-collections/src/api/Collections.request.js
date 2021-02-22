import { postQuery } from '@scandipwa/shopify-nextjs-api/src/api/request';

import { processCollectionByHandleResponse, processCollectionsResponse } from './Collections.processor';
import getCollectionQueryOfType, { PAGINATED_COLLECTIONS, SINGLE_COLLECTION } from './Collections.query';

/** @namespace ShopifyNextjsCollections/Api/Collections/Request/requestCollection */
export const requestCollection = async (queryArgs) => {
    const queryGetter = getCollectionQueryOfType(SINGLE_COLLECTION);
    const responseProcessor = processCollectionByHandleResponse;
    const response = await postQuery(queryGetter(queryArgs));
    const collection = responseProcessor(response);
    return collection;
};

/** @namespace ShopifyNextjsCollections/Api/Collections/Request/requestCollections */
export const requestCollections = async (queryArgs) => {
    const queryGetter = getCollectionQueryOfType(PAGINATED_COLLECTIONS);
    const responseProcessor = processCollectionsResponse;
    const response = await postQuery(queryGetter(queryArgs));
    const collections = responseProcessor(response);
    return collections;
};
