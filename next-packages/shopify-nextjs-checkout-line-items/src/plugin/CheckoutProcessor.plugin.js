/* eslint-disable no-param-reassign */

const processLineItems = ([checkout], callback) => {
    // process with original processor
    callback(checkout);

    const { lineItems: { edges } = {} } = checkout;

    if (!edges) {
        return;
    }

    checkout.lineItems = edges.map(({ node }) => node);
};

export default {
    'ShopifyNextjsCheckout/Api/Checkout/Processor/processCheckout': {
        function: processLineItems
    }
};
