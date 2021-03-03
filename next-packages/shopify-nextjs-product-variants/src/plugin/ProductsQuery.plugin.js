import { PAGINATED_PRODUCTS } from '@scandipwa/shopify-nextjs-products/src/api/Products.query';

import ProductsVariantsQuery from '../api/ProductVariants.query';

const addVariantsField = (args, callback, instance) => {
    const originalProductFields = callback(...args);

    if (!instance.currentType) {
        // do not add variants if type is undefined
        return [
            ...originalProductFields,
            ProductsVariantsQuery.getOptionsField()
        ];
    }

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
    'ShopifyNextjsProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addVariantsField
        }
    }
};
