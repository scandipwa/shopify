import CustomerProvider from '../context/Customer.provider';

const addCustomerProvider = (member) => {
    const CUSTOMER_POSITION = 2000;

    member.addItem(
        (children) => (
            <CustomerProvider>
                { children }
            </CustomerProvider>
        ),
        'appCustomerProvider',
        CUSTOMER_POSITION
    );

    return member;
};

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProvidersRenderList: addCustomerProvider
        }
    }
};
