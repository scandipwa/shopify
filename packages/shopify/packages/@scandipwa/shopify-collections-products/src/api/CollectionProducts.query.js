import { Field } from '@scandipwa/graphql';
import ProductsQuery from '@scandipwa/shopify-products/src/api/Products.query';

/** @namespace ShopifyCollection-Products/Api/CollectionProducts/Query/CollectionProductsQuery */
export class CollectionProductsQuery {
    _getCollectionProductsFields(options) {
        return [
            ProductsQuery.getProductsField(options),
            'handle'
        ];
    }

    getCollectionProducts = (options) => {
        const { handle, ...restOptions } = options;

        return new Field('collectionByHandle')
            .addFieldList(this._getCollectionProductsFields(restOptions))
            .addArgument('handle', 'String!', handle);
    };
}

export default new CollectionProductsQuery();
