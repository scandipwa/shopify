import CustomerProvider from '../context/Customer.provider';

const addCustomerProvider = (member) => {
    const CUSTOMER_POSITION = 2000;

    member.addItemToPosition((children) => (
        <CustomerProvider>
            { children }
        </CustomerProvider>
    ), CUSTOMER_POSITION);

    return member;
};

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProvidersRenderList: addCustomerProvider
        }
    }
};
