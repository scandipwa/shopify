import { processProduct } from '@scandipwa/shopify-products/src/api/Products.processor';

/** @namespace ShopifyProductRecommendations/Api/ProductRecommendations/Processor/processProductRecommendationsResponse */
export const processProductRecommendationsResponse = ({ productRecommendations }) => {
    productRecommendations.forEach((node) => processProduct(node));
    return productRecommendations;
};