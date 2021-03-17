const addProductFields = (args, callback) => [
    ...callback(...args),
    'availableForSale'
];

export default {
    'ShopifyNextjsProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addProductFields
        }
    }
};
