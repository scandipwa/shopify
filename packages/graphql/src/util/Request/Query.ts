import { Field } from '../Query/Field';
import { GraphQLDocument, prepareRequest, QUERY_TYPE } from '../Query/prepareDocument';
import { executePost } from './Request';

/** @namespace Graphql/Util/Request/Query/prepareQuery */
export const prepareQuery = <
    N extends string,
    RT,
    F extends Field<N, RT>
>(queries: F[]): GraphQLDocument => prepareRequest(queries, QUERY_TYPE);

/** @namespace Graphql/Util/Request/Query/postQuery */
export const postQuery = <
    N extends string,
    RT,
    F extends Field<N, RT>
>(rawQueries: F | F[], options: unknown): Promise<F['resultTypeHolder']> => {
    const queries = Array.isArray(rawQueries) ? rawQueries : [rawQueries];

    return executePost(prepareQuery(queries), options) as Promise<F['resultTypeHolder']>;
};
