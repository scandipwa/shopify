import BrowserDatabase from '@scandipwa/framework/src/util/BrowserDatabase';
import ApiContext from '@scandipwa/shopify-api/src/context/ShopifyApi.context';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { processCustomer } from '../api/Customer.processor';
import getCustomerQueryOfType, {
    CUSTOMER_CREATE, CUSTOMER_GET, CUSTOMER_LOGIN, CUSTOMER_LOGOUT
} from '../api/Customer.query';
import CustomerContext from './Customer.context';

export const CUSTOMER_TOKEN_FROM_STORAGE = 'shopify_customer_token';

/**
 * Provider class Customer Context. Used to make customer data available to all children components.
 * @namespace ShopifyCustomer/Context/Customer/Provider/CustomerProvider */
export class CustomerProvider extends PureComponent {
    static contextType = ApiContext;

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    __construct(props) {
        super.__construct(props);

        const customerToken = BrowserDatabase.getItem(CUSTOMER_TOKEN_FROM_STORAGE);

        this.state = {
            token: customerToken || {},
            customer: {},
            isCustomerLoading: !!customerToken,
            isLoggedIn: !!customerToken
        };

        this.initializeCustomer();
    }

    async initializeCustomer() {
        const { token: { accessToken: token } } = this.state;

        if (!token) {
            // Do not create new checkout while user have not
            // added at least one produtc to cart
            // this.createNewCheckout();
            return;
        }

        this.fetchExisingCustomer();
    }

    async _updateStatePromise(newState) {
        return new Promise((resolve) => {
            this.setState(newState, resolve);
        });
    }

    checkForUserErrors(parentField) {
        const { customerUserErrors } = parentField;

        if (!customerUserErrors?.length) {
            // ignore if no errors found
            return;
        }

        const customerUserError = customerUserErrors.map(
            ({ message }) => message
        ).join('. ');

        throw new Error(customerUserError);
    }

    async fetchExisingCustomer() {
        const { token: { accessToken: token } } = this.state;
        const { postQuery } = this.context;
        const mutation = getCustomerQueryOfType(CUSTOMER_GET)({ token });
        // TODO: handle potential errors
        const { customer } = await postQuery(mutation);
        processCustomer(customer);
        await this._updateStatePromise({
            customer,
            isCustomerLoading: false
        });
    }

    async login(data) {
        const { postMutation } = this.context;
        const mutation = getCustomerQueryOfType(CUSTOMER_LOGIN)(data);

        // check for errors, throw if needed
        const { customerAccessTokenCreate } = await postMutation(mutation);
        this.checkForUserErrors(customerAccessTokenCreate);

        // asumming there were no erros and token is present
        const { customerAccessToken: token } = customerAccessTokenCreate;
        BrowserDatabase.setItem(CUSTOMER_TOKEN_FROM_STORAGE, token);
        await this._updateStatePromise({ token, isLoggedIn: true });
        await this.fetchExisingCustomer();
    }

    async register(data) {
        const { postMutation } = this.context;
        const mutation = getCustomerQueryOfType(CUSTOMER_CREATE)(data);

        // check for errors, throw if needed
        const { customerCreate } = await postMutation(mutation);
        this.checkForUserErrors(customerCreate);

        // reuse data from regitration form
        const { email, password } = data;
        await this.login({ email, password });
    }

    async logout() {
        const { token: { accessToken: token } } = this.state;
        const { postMutation } = this.context;
        const mutation = getCustomerQueryOfType(CUSTOMER_LOGOUT)({ token });
        // TODO: handle potential errors
        await postMutation(mutation);
        await this._updateStatePromise({
            token: {},
            customer: {},
            isLoggedIn: false
        });
    }

    /**
     * A function which returns an object that will be visible in the Customer Context
     * @extPoint Add more fields to Customer Context.
     * @extExample (args, callback, instance) => ({
     *      ...args,
     *      isCustomerLoggedIn
     * })
     */
    getContextValue() {
        const {
            customer,
            isCustomerLoading,
            isLoggedIn
        } = this.state;

        return {
            login: this.login.bind(this),
            logout: this.logout.bind(this),
            register: this.register.bind(this),
            refresh: this.fetchExisingCustomer.bind(this),
            isCustomerLoading,
            customer,
            isLoggedIn
        };
    }

    render() {
        const { children } = this.props;

        return (
            <CustomerContext.Provider value={ this.getContextValue() }>
                { children }
            </CustomerContext.Provider>
        );
    }
}

export default CustomerProvider;
