import { Field } from '../Query/Field';
import { GraphQLDocument, MUTATION_TYPE, prepareRequest } from '../Query/prepareDocument';
import { executePost } from './Request';

/** @namespace Graphql/Util/Request/Mutation/prepareMutation */
export const prepareMutation = <
    N extends string,
    RT,
    F extends Field<N, RT>
>(mutations: F[]): GraphQLDocument => prepareRequest(mutations, MUTATION_TYPE);

/** @namespace Graphql/Util/Request/Mutation/postMutation */
export const postMutation = <
    N extends string,
    RT,
    F extends Field<N, RT>
>(rawMutations: F | F[], options: unknown): Promise<F['resultTypeHolder']> => {
    const queries = Array.isArray(rawMutations) ? rawMutations : [rawMutations];

    return executePost(prepareMutation(queries), options) as Promise<F['resultTypeHolder']>;
};
