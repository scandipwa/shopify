import { Field } from '../Query/Field';
import { prepareRequest, QUERY_TYPE } from '../Query/prepareDocument';
import { executePost } from './Request';

/** @namespace Graphql/Util/Request/Query/prepareQuery */
export const prepareQuery = (queries) => prepareRequest(queries, QUERY_TYPE);

/** @namespace Graphql/Util/Request/Query/postQuery */
export const postQuery = (rawQueries, options) => {
    const queries = rawQueries instanceof Field ? [rawQueries] : rawQueries;
    return executePost(prepareQuery(queries, true), options);
};
