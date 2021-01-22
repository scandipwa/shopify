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

/** @namespace ShopifyCustomer/Context/Customer/Provider/CustomerProvider */
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
        const {
            customerAccessTokenCreate: {
                customerAccessToken: token,
                customerUserErrors
            }
        } = await postMutation(mutation);

        if (token) {
            BrowserDatabase.setItem(CUSTOMER_TOKEN_FROM_STORAGE, token);
            await this._updateStatePromise({ token, isLoggedIn: true });
            await this.fetchExisingCustomer();
        }

        if (customerUserErrors?.length) {
            throw customerUserErrors;
        }
    }

    async register(data) {
        const { postMutation } = this.context;
        const mutation = getCustomerQueryOfType(CUSTOMER_CREATE)(data);
        // TODO: handle potential errors
        const {
            customerCreate: { customerUserErrors }
        } = await postMutation(mutation);

        if (customerUserErrors?.length) {
            throw customerUserErrors;
        }

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
