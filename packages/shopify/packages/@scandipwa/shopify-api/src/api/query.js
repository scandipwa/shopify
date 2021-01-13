import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyApi/Api/Query/getPageInfoField */
export const getPageInfoField = () => new Field('pageInfo').addFieldList([
    'hasNextPage',
    'hasPreviousPage'
]);

/** @namespace ShopifyApi/Api/Query/mapQueryToType */
export const mapQueryToType = (Query) => (type) => {
    const query = new Query();
    query.currentType = type;
    return query.typeMap[type].bind(query);
};

/** @namespace ShopifyApi/Api/Query/TypedQuery */
export class TypedQuery {
    typeMap = {};

    currentType = '';
}
