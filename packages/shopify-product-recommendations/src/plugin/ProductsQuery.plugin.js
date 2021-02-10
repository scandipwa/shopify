import ProductRecommendationsQuery from '../api/ProductRecommendations.query';

export const PRODUCT_RECOMMENDATIONS = 'product_recommendations';

const addProductRecommendationsQuery = (member, instance) => ({
    ...member,
    [PRODUCT_RECOMMENDATIONS]: ProductRecommendationsQuery.getRecommendedProductsField.bind(instance)
});

export default {
    'ShopifyProducts/Api/Products/Query/ProductsQuery': {
        'member-property': {
            typeMap: addProductRecommendationsQuery
        }
    }
};
