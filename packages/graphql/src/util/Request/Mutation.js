import { Field } from '../Query/Field';
import { MUTATION_TYPE, prepareRequest } from '../Query/prepareDocument';
import { executePost } from './Request';

/** @namespace Graphql/Util/Request/Mutation/prepareMutation */
export const prepareMutation = (mutations) => prepareRequest(mutations, MUTATION_TYPE);

/** @namespace Graphql/Util/Request/Mutation/postMutation */
export const postMutation = (rawMutations, options) => {
    const queries = rawMutations instanceof Field ? [rawMutations] : rawMutations;
    return executePost(prepareMutation(queries, true), options);
};
