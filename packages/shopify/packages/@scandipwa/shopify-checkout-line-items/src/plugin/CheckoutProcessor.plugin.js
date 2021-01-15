/* eslint-disable no-param-reassign */

const processVariants = ([checkout], callback) => {
    // process with original processor
    callback(checkout);

    const { lineItems: { edges } = {} } = checkout;

    if (!edges) {
        return;
    }

    checkout.lineItems = edges.map(({ node }) => node);
};

export default {
    'ShopifyCheckout/Api/Checkout/Processor/processCheckout': {
        function: processVariants
    }
};
