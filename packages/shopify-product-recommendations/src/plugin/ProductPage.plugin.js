import ProductRecommendations from '../component/ProductRecommendations';

const addProductRecommendationsSection = (args, callback) => {
    const initialSections = callback(args);

    return [
        ...initialSections,
        <ProductRecommendations key="recommendations" />
    ];
};

export default {
    'ShopifyProducts/Component/ProductPage/Component/ProductPageComponent': {
        'member-function': {
            renderSections: addProductRecommendationsSection
        }
    }
};
