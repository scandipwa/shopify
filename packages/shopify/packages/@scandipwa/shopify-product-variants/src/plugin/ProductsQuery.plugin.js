import { PAGINATED_PRODUCTS } from '@scandipwa/shopify-products/src/api/Products.query';

import ProductsVariantsQuery from '../api/ProductVariants.query';

const addVariantsField = (args, callback, instance) => {
    const originalProductFields = callback(...args);
    const isFromProductsPage = instance.currentType === PAGINATED_PRODUCTS;

    const ONE_VARINAT = 1;
    const ALL_VARINATS = 100;

    return [
        ...originalProductFields,
        ProductsVariantsQuery.getOptionsField(),
        ProductsVariantsQuery.getVariantsField({
            first: isFromProductsPage ? ONE_VARINAT : ALL_VARINATS
        })
    ];
};

export default {
    'ShopifyProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addVariantsField
        }
    }
};
