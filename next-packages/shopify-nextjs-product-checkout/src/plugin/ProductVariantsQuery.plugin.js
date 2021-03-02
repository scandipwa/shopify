const addVariantFields = (args, callback) => [
    ...callback(...args),
    'availableForSale',
    'currentlyNotInStock',
    'quantityAvailable'
];

export default {
    'ShopifyNextjsProductVariants/Api/ProductVariants/Query/ProductVariantsQuery': {
        'member-function': {
            _getVariantFields: addVariantFields
        }
    }
};
