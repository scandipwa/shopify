import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyApi/Api/Query/getPageInfoField */
export const getPageInfoField = () => new Field('pageInfo').addFieldList([
    'hasNextPage',
    'hasPreviousPage'
]);
