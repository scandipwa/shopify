import { createElement } from 'react';

import ProductRecommendations from '../component/ProductRecommendations';

const addProductRecommendations = (member) => {
    const PRODUCT_RECOMMENDATIONS_POSITION = 2000;
    member.addItem(
        () => createElement(ProductRecommendations),
        'productPageRecommendations',
        PRODUCT_RECOMMENDATIONS_POSITION
    );

    return member;
};

export default {
    'ShopifyProducts/Component/ProductPage/Component/ProductPageComponent': {
        member: {
            sortedRenderMap: addProductRecommendations
        }
    }
};
