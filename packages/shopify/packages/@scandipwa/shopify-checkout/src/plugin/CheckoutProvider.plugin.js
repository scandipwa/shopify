import CheckoutProvider from '../context/Checkout.provider';

const addCheckoutProvider = (member) => [
    ...member,
    (children) => (
        <CheckoutProvider>
            { children }
        </CheckoutProvider>
    )
];

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProviders: addCheckoutProvider
        }
    }
};
