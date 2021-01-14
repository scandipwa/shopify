import ProductPricesQuery from '../api/ProductPrices.query';

const addPriceRangeField = (args, callback) => [
    ...callback(...args),
    ProductPricesQuery.getPriceRangeField()
];

export default {
    'ShopifyProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addPriceRangeField
        }
    }
};
