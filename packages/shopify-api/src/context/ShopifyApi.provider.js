import { postMutation, postQuery } from '@scandipwa/graphql';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ShopifyAPIContext from './ShopifyApi.context';

/**
 * Provider class for Shopify Api Context. Used to make methods related to Shopify API connection available to all children components.
 * @namespace ShopifyApi/Context/ShopifyApi/Provider/ShopifyApiProvider */
export class ShopifyApiProvider extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    config = {
        token: process.env.REACT_APP_SHOPIFY_TOKEN,
        domain: process.env.REACT_APP_SHOPIFY_DOMAIN
    };

    _getFormattedOptions() {
        const { token, domain } = this.config;

        // TODO: for language add "Accept-Language" header

        return {
            endpoint: domain,
            headers: {
                'X-Shopify-Storefront-Access-Token': token
            }
        };
    }

    postMutation = (mutations) => postMutation(mutations, this._getFormattedOptions());

    postQuery = (queries) => postQuery(queries, this._getFormattedOptions());

    /**
     * A function which returns an object that will be visible in the Shopify API Context
     * @extPoint Add more fields to Shopify API Context.
     * @extExample (args, callback, instance) => ({
     *      ...args,
     *      apiVersion: '2020-01'
     * })
     */
    getContextValue() {
        return {
            postQuery: this.postQuery,
            postMutation: this.postMutation
        };
    }

    render() {
        const { children } = this.props;

        return (
            <ShopifyAPIContext.Provider value={ this.getContextValue() }>
                { children }
            </ShopifyAPIContext.Provider>
        );
    }
}

export default ShopifyApiProvider;
