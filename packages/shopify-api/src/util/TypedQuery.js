/**
 * Resolves a field getter that is accossiated to given type from the TypedQuery declaration.
 * @example // /api/Product.query.js
 * export mapQueryToType(ProductQuery);
 * // /context/Product.provider.js
 * getProduct() {
 *      // ...
 *      const queryGetter = getProductQueryByType(SINGLE_PRODUCT);
 *      // ...
 * }
 * @namespace ShopifyApi/Util/TypedQuery/mapQueryToType */

export const mapQueryToType = (Query) => (type) => {
    const query = new Query();
    query.currentType = type;
    return query.typeMap[type].bind(query);
};

/**
 * Class to allow for easier manipulations with Queries. Main idea is to allow for easy retrieval of field getter by Query type.
 * In addition to that, this.currentType property allows for conditional field extension via plugin mechanism only for specific field getters.
 * @example // Query specific product field only when on Product description page.
 * (args, callback, instance) => {
 *      const isFromProductPage = instance.currentType === SINGLE_PRODUCT;
 *      return [
 *          ...callback(...args),
 *          'fieldOnlyForProductPage'
 *      ]
 * }
 * @namespace ShopifyApi/Util/TypedQuery/TypedQuery */
export class TypedQuery {
    typeMap = {};

    currentType = '';
}
