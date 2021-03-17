import ProductPricesQuery from '../api/ProductPrices.query';

const addPriceFields = (args, callback) => [
    ...callback(...args),
    ProductPricesQuery.getPriceField(),
    ProductPricesQuery.getCompareAtPriceField()
];

export default {
    'ShopifyProductVariants/Api/ProductVariants/Query/ProductVariantsQuery': {
        'member-function': {
            _getVariantFields: addPriceFields
        }
    }
};
