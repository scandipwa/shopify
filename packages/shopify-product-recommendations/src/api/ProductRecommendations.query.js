import { Field } from '@scandipwa/graphql';
import { ProductsQuery } from '@scandipwa/shopify-products/src/api/Products.query';

export const RECOMMENDATIONS_GET = 'recommendations';

/** @namespace ShopifyProductRecommendations/Api/ProductRecommendations/Query/ProductRecommendationsQuery */
export class ProductRecommendationsQuery {
    getRecommendedProductsField({ productId }) {
        return new Field('productRecommendations')
            .addFieldList(new ProductsQuery()._getProductFields())
            .addArgument('productId', 'ID!', productId);
    }
}

export default new ProductRecommendationsQuery();
