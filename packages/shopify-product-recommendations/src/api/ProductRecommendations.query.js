import { Field } from '@scandipwa/graphql';

/**
 * Product Recommendations query declaration.
 * @namespace ShopifyProductRecommendations/Api/ProductRecommendations/Query/ProductRecommendationsQuery */
export class ProductRecommendationsQuery {
    getRecommendedProductsField({ productId }) {
        return new Field('productRecommendations')
            .addFieldList(this._getProductFields())
            .addArgument('productId', 'ID!', productId);
    }
}

export default new ProductRecommendationsQuery();
