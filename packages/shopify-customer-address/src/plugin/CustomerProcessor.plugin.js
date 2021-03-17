/* eslint-disable no-param-reassign */

const processCustomerAddresses = ([customer], callback) => {
    // process with original processor
    callback(customer);

    const { addresses: { edges } = {} } = customer;

    if (!edges) {
        return;
    }

    customer.addresses = edges.map(({ node }) => node);
};

export default {
    'ShopifyCustomer/Api/Customer/Processor/processCustomer': {
        function: processCustomerAddresses
    }
};
