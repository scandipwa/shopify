const addProductFields = (args, callback) => [
    ...callback(...args),
    'availableForSale'
];

export default {
    'ShopifyProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addProductFields
        }
    }
};
