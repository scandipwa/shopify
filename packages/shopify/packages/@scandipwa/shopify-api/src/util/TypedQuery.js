/** @namespace ShopifyApi/Util/TypedQuery/mapQueryToType */

export const mapQueryToType = (Query) => (type) => {
    const query = new Query();
    query.currentType = type;
    return query.typeMap[type].bind(query);
};
/** @namespace ShopifyApi/Util/TypedQuery/TypedQuery */

export class TypedQuery {
    typeMap = {};

    currentType = '';
}