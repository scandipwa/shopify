import BrowserDatabase from '@scandipwa/framework/src/util/BrowserDatabase';
import ApiContext from '@scandipwa/shopify-api/src/context/ShopifyApi.context';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { processCheckout } from '../api/Checkout.processor';
import getCheckoutQueryOfType, { CREATE_CHECKOUT, FETCH_CHECKOUT } from '../api/Checkout.query';
import CheckoutContext from './Checkout.context';

export const CHECKOUT_FROM_STORAGE = 'shopify_checkout';

/**
 * Provider class for Checkout Context. Used to make checkout data available to every component in the app
 * @namespace ShopifyCheckout/Context/Checkout/Provider/CheckoutProvider */
export class CheckoutProvider extends PureComponent {
    static contextType = ApiContext;

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    __construct(props) {
        super.__construct(props);

        const checkoutFromStorage = BrowserDatabase.getItem(CHECKOUT_FROM_STORAGE);

        this.state = {
            checkout: checkoutFromStorage || {},
            isCheckoutProcessStarted: !!checkoutFromStorage
        };

        this.initializeCheckout();
    }

    async initializeCheckout() {
        const { checkout: { id } } = this.state;

        if (!id) {
            // Do not create new checkout while user have not
            // added at least one produtc to cart
            // this.createNewCheckout();
            return;
        }

        this.fetchExisingCheckout();
    }

    async fetchExisingCheckout() {
        const { checkout: { id } } = this.state;
        const { postQuery } = this.context;
        const mutation = getCheckoutQueryOfType(FETCH_CHECKOUT)({ id });
        const { checkout } = await postQuery(mutation);
        this.updateCheckout(checkout);
        return checkout;
    }

    async createNewCheckout() {
        const { postMutation } = this.context;
        const mutation = getCheckoutQueryOfType(CREATE_CHECKOUT)();
        const { checkoutCreate: { checkout } } = await postMutation(mutation);
        this.updateCheckout(checkout);
        return checkout;
    }

    updateCheckout(checkout) {
        processCheckout(checkout);
        BrowserDatabase.setItem(CHECKOUT_FROM_STORAGE, checkout);
        this.setState({ checkout, isCheckoutProcessStarted: true });
    }

    /**
     * A function which returns an object that will be visible in the Checkout Context
     * @extPoint Add more fields to Checkout Context outside of Shopify API
     * @extExample (args, callback) => ({
     *      ...args,
     *      isEligibleForCheckout: isUserLoggedIn
     * })
     */
    getContextValue() {
        const {
            checkout,
            isCheckoutProcessStarted
        } = this.state;

        return {
            checkout,
            isCheckoutProcessStarted
        };
    }

    render() {
        const { children } = this.props;

        return (
            <CheckoutContext.Provider value={ this.getContextValue() }>
                { children }
            </CheckoutContext.Provider>
        );
    }
}

export default CheckoutProvider;
