import ApiContext from '@scandipwa/shopify-api/src/context/ShopifyApi.context';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { processShop } from '../api/Shop.processor';
import ShopQuery from '../api/Shop.query';
import CheckoutContext from './Shop.context';

export const CHECKOUT_FROM_STORAGE = 'shopify_checkout';

/**
 * Provider class for Shop Context. Used to make shop data available to every component in the app.
 * @namespace ShopifyShop/Context/Shop/Provider/ShopProvider */
export class ShopProvider extends PureComponent {
    static contextType = ApiContext;

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            shop: {}
        };

        this.fetchShopConfig();
    }

    async fetchShopConfig() {
        const { postQuery } = this.context;
        const mutation = ShopQuery.getShopField();
        const { shop } = await postQuery(mutation);
        processShop(shop);
        this.setState({ shop });
    }

    /**
     * A function which returns an object that will be visible in the Shop Context
     * @extPoint Add more fields to Shop Context outside of Shopify API
     * @extExample (args, callback) => ({
     *      ...args,
     *      supportedLanguages: ['EN', 'IT', 'ES']
     * })
     */
    getContextValue() {
        const { shop } = this.state;
        return { shop };
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

export default ShopProvider;
