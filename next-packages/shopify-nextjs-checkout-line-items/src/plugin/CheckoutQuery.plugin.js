import getCheckoutLineItemsQueryOfType, {
    CHECKOUT_LINE_ITEMS
} from '../api/CheckoutLineItems.query';

const addCheckoutFields = (args, callback) => [
    ...callback(...args),
    getCheckoutLineItemsQueryOfType(CHECKOUT_LINE_ITEMS)()
];

export default {
    'ShopifyNextjsCheckout/Api/Checkout/Query/CheckoutQuery': {
        'member-function': {
            _getCheckoutFields: addCheckoutFields
        }
    }
};
