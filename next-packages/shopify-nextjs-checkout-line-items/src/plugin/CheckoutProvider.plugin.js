import { postMutation } from '@scandipwa/shopify-nextjs-api/src/api/request';

import getCheckoutLineItemsQueryOfType, {
    ADD_LINE_ITEMS,
    REMOVE_LINE_ITEMS,
    UPDATE_LINE_ITEMS
} from '../api/CheckoutLineItems.query';

const addFieldsToContext = (args, callback, instance) => {
    const fields = callback(...args);

    return {
        ...fields,
        addVariantToCart: instance.addVariantToCart.bind(instance),
        removeLineItemById: instance.removeLineItemById.bind(instance),
        updateLineQtyItemById: instance.updateLineQtyItemById.bind(instance)
    };
};

const addAddVariantToCartFunction = async (args, callback, instance) => {
    callback(...args);

    const { isCheckoutProcessStarted } = instance.state;

    const checkoutId = !isCheckoutProcessStarted
        ? (await instance.createNewCheckout()).id
        : instance.state.checkout.id;

    // Arguments are: variant, qty
    const [{ id: variantId }, quantity = 1] = args;
    const queryParams = {
        checkoutId,
        lineItems: [{
            variantId,
            quantity: parseInt(quantity, 10)
        }]
    };

    const mutation = getCheckoutLineItemsQueryOfType(ADD_LINE_ITEMS)(queryParams);
    const { checkoutLineItemsAdd: { checkout } } = await postMutation(mutation);
    instance.updateCheckout(checkout);
};

const addRemoveLineItemByIdFunction = async (args, callback, instance) => {
    callback(...args);

    // Arguments are: lineItemId
    const [lineItemId] = args;
    const { checkout: { id: checkoutId } } = instance.state;
    const queryParams = { checkoutId, lineItemsIds: [lineItemId] };

    const mutation = getCheckoutLineItemsQueryOfType(REMOVE_LINE_ITEMS)(queryParams);
    const { checkoutLineItemsRemove: { checkout } } = await postMutation(mutation);
    instance.updateCheckout(checkout);
};

const addUpdateLineItemQtyByIdFunction = async (args, callback, instance) => {
    callback(...args);

    // Arguments are: lineItemId, qty
    const [lineItemId, quantity] = args;
    const { checkout: { id: checkoutId } } = instance.state;
    const queryParams = {
        checkoutId,
        lineItems: [{
            id: lineItemId,
            quantity: parseInt(quantity, 10)
        }]
    };

    const mutation = getCheckoutLineItemsQueryOfType(UPDATE_LINE_ITEMS)(queryParams);
    const { checkoutLineItemsUpdate: { checkout } } = await postMutation(mutation);
    instance.updateCheckout(checkout);
};

export default {
    'ShopifyNextjsCheckout/Context/Checkout/Provider/CheckoutProvider': {
        'member-function': {
            getContextValue: addFieldsToContext,
            addVariantToCart: addAddVariantToCartFunction,
            removeLineItemById: addRemoveLineItemByIdFunction,
            updateLineQtyItemById: addUpdateLineItemQtyByIdFunction
        }
    }
};
