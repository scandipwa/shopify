const addMoneyFormatField = (args, callback) => [
    ...callback(...args),
    'moneyFormat'
];

export default {
    'ShopifyShop/Api/Shop/Query/ShopQuery': {
        'member-function': {
            _getShopFields: addMoneyFormatField
        }
    }
};
