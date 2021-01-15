const addVariantFields = (args, callback) => [
    ...callback(...args),
    'availableForSale',
    'currentlyNotInStock',
    'quantityAvailable'
];

export default {
    'ShopifyProduct-Variants/Api/ProductVariants/Query/ProductVariantsQuery': {
        'member-function': {
            _getVariantFields: addVariantFields
        }
    }
};
