import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyNextjsApi/Api/Query/getPageInfoField */
export const getPageInfoField = () => new Field('pageInfo').addFieldList([
    'hasNextPage',
    'hasPreviousPage'
]);
