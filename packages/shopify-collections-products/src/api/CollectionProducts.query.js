import { Field } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';
import getProductsQueryOfType, { PAGINATED_PRODUCTS } from '@scandipwa/shopify-products/src/api/Products.query';

export const SINGLE_PRODUCT_COLLECTION = 'single';

/** @namespace ShopifyCollections-Products/Api/CollectionProducts/Query/CollectionProductsQuery */
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
