import BrowserDatabase from '@scandipwa/nextjs-framework/src/util/BrowserDatabase';
import { postMutation, postQuery } from '@scandipwa/shopify-nextjs-api/src/api/request';
import ApiContext from '@scandipwa/shopify-nextjs-api/src/context/ShopifyApi.context';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { processCheckout } from '../api/Checkout.processor';
import getCheckoutQueryOfType, { CREATE_CHECKOUT, FETCH_CHECKOUT } from '../api/Checkout.query';
import CheckoutContext from './Checkout.context';

export const CHECKOUT_FROM_STORAGE = 'shopify_checkout';

/** @namespace ShopifyNextjsCheckout/Context/Checkout/Provider/CheckoutProvider */
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
        const mutation = getCheckoutQueryOfType(FETCH_CHECKOUT)({ id });
        const { checkout } = await postQuery(mutation);

        this.updateCheckout(checkout);

        return checkout;
    }

    async createNewCheckout() {
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
