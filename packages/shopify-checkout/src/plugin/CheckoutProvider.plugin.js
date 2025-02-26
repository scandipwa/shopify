import CheckoutProvider from '../context/Checkout.provider';

const addCheckoutProvider = (member) => {
    const CHECKOUT_POSITION = 1000;

    member.addItem(
        (children) => (
            <CheckoutProvider>
                { children }
            </CheckoutProvider>
        ),
        'appCheckoutProvider',
        CHECKOUT_POSITION
    );

    return member;
};

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProvidersRenderList: addCheckoutProvider
        }
    }
};
