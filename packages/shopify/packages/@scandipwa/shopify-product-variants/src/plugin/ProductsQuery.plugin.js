import { PAGINATED_PRODUCTS } from '@scandipwa/shopify-products/src/api/Products.query';

import ProductsVariantsQuery from '../api/ProductVariants.query';

const addVariantsField = (args, callback, instance) => {
    const originalProductFields = callback(...args);

    if (instance.currentType === PAGINATED_PRODUCTS) {
        return originalProductFields;
    }

    return [
        ...originalProductFields,
        ProductsVariantsQuery.getOptionsField(),
        ProductsVariantsQuery.getVariantsField()
    ];
};

export default {
    'ShopifyProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addVariantsField
        }
    }
};
