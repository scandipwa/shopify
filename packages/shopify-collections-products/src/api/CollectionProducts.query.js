import { Field } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';
import getProductsQueryOfType, { PAGINATED_PRODUCTS } from '@scandipwa/shopify-products/src/api/Products.query';

/**
 * A type of `CollectionProductsQuery` associated with `getCollectionProducts` function.
 * @example // Returns getter of single collection-products query
 * import getCollectionProductsQueryByType, { SINGLE_PRODUCT_COLLECTION } from '%filename%';
 * const queryGetter = getCollectionQueryByType(SINGLE_PRODUCT_COLLECTION);
 */
export const SINGLE_PRODUCT_COLLECTION = 'single';

/**
 * Collection-products query declarations.
 * Read more: [Query controller](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller), [TypedQuery](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#typedquery)
 * @namespace ShopifyCollectionsProducts/Api/CollectionProducts/Query/CollectionProductsQuery */
export class CollectionProductsQuery extends TypedQuery {
    typeMap = {
        [SINGLE_PRODUCT_COLLECTION]: this.getCollectionProducts.bind(this)
    };

    _getCollectionProductsFields(options) {
        return [
            getProductsQueryOfType(PAGINATED_PRODUCTS)(options),
            'handle'
        ];
    }

    getCollectionProducts(options) {
        const { handle, ...restOptions } = options;

        return new Field('collectionByHandle')
            .addFieldList(this._getCollectionProductsFields(restOptions))
            .addArgument('handle', 'String!', handle);
    }
}

export default mapQueryToType(CollectionProductsQuery);
