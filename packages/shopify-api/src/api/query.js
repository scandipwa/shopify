import { Field } from '@scandipwa/graphql';

/**
 * Function that returns a field declaration for pageInfo. This is commonly used structure in the Shopify Storefront API.
 * @namespace ShopifyApi/Api/Query/getPageInfoField */
export const getPageInfoField = () => new Field('pageInfo').addFieldList([
    'hasNextPage',
    'hasPreviousPage'
]);
