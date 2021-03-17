import getCustomerAddressQueryOfType, {
    ADDERSS_UPDATE,
    ADDRESS_CREATE,
    ADDRESS_DELETE
} from '../api/CustomerAddress.query';

const addIsAddressesLoading = (args, callback, instance) => {
    callback(...args);

    // eslint-disable-next-line no-param-reassign
    instance.state = {
        ...instance.state || {},
        isAddressesLoading: false
    };
};

const addFieldsToContext = (args, callback, instance) => {
    const fields = callback(...args);

    return {
        ...fields,
        createAddress: instance.createAddress.bind(instance),
        deleteAddress: instance.deleteAddress.bind(instance),
        updateAddress: instance.updateAddress.bind(instance)
    };
};

const addCreateAddressFunction = async (args, callback, instance) => {
    await callback(...args);

    const [{ address }] = args;
    const { postMutation } = instance.context;
    const { token: { accessToken: token } } = instance.state;
    const mutation = getCustomerAddressQueryOfType(ADDRESS_CREATE)({ token, address });
    const { customerAddressCreate: { customerUserErrors } } = await postMutation(mutation);

    if (customerUserErrors?.length) {
        throw customerUserErrors;
    }

    // update address list & remove loading
    await instance.fetchExisingCustomer();
};

const addDeleteAddressFunction = async (args, callback, instance) => {
    await callback(...args);

    // show address loading
    instance.setState({ isAddressesLoading: true });

    const [{ id }] = args;
    const { postMutation } = instance.context;
    const { token: { accessToken: token } } = instance.state;
    const mutation = getCustomerAddressQueryOfType(ADDRESS_DELETE)({ id, token });
    const { customerAddressDelete: { customerUserErrors } } = await postMutation(mutation);

    if (customerUserErrors?.length) {
        throw customerUserErrors;
    }

    // update address list & remove loading
    await instance.fetchExisingCustomer();
};

const addUpdateAddressFunction = async (args, callback, instance) => {
    await callback(...args);

    // show address loading
    instance.setState({ isAddressesLoading: true });

    const [{ id, address }] = args;
    const { postMutation } = instance.context;
    const { token: { accessToken: token } } = instance.state;
    const mutation = getCustomerAddressQueryOfType(ADDERSS_UPDATE)({ id, token, address });
    const { customerAddressUpdate: { customerUserErrors } } = await postMutation(mutation);

    if (customerUserErrors?.length) {
        throw customerUserErrors;
    }

    // update address list & remove loading
    await instance.fetchExisingCustomer();
};

export default {
    'ShopifyCustomer/Context/Customer/Provider/CustomerProvider': {
        'member-function': {
            __construct: addIsAddressesLoading,
            getContextValue: addFieldsToContext,
            createAddress: addCreateAddressFunction,
            deleteAddress: addDeleteAddressFunction,
            updateAddress: addUpdateAddressFunction
        }
    }
};
