import { Field } from '@scandipwa/graphql';

/**
 * Product Recommendations query declaration.
 * Read more: [Query controller](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller)
 * @namespace ShopifyProductRecommendations/Api/ProductRecommendations/Query/ProductRecommendationsQuery */
export class ProductRecommendationsQuery {
    getRecommendedProductsField({ productId }) {
        return new Field('productRecommendations')
            .addFieldList(this._getProductFields())
            .addArgument('productId', 'ID!', productId);
    }
}

export default new ProductRecommendationsQuery();
