import { postQuery } from '@scandipwa/shopify-nextjs-api/src/api/request';

import { processPageByHandleResponse } from './Page.processor';
import getPageQueryOfType, { SINGLE_PAGE } from './Page.query';

/** @namespace ShopifyNextjsPages/Api/Page/Request/requestPage */
export const requestPage = async (handle) => {
    const queryGetter = getPageQueryOfType(SINGLE_PAGE);
    const responseProcessor = processPageByHandleResponse;
    const response = await postQuery(queryGetter({ handle }));
    const page = responseProcessor(response);
    return page;
};
