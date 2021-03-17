import getCustomerAddressQueryOfType, { ADDRESS_GET, DEFAULT_ADDRESS_GET } from '../api/CustomerAddress.query';

const addAddressFields = (args, callback) => [
    ...callback(...args),
    // add default address
    getCustomerAddressQueryOfType(DEFAULT_ADDRESS_GET)(),
    // add address list (up to 100)
    getCustomerAddressQueryOfType(ADDRESS_GET)()
];

export default {
    'ShopifyCustomer/Api/Customer/Query/CustomerQuery': {
        'member-function': {
            _getCustomerFields: addAddressFields
        }
    }
};
