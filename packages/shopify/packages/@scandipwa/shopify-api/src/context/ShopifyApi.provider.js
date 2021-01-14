import { postMutation, postQuery } from '@scandipwa/graphql';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ShopifyAPIContext from './ShopifyApi.context';

/** @namespace ShopifyApi/Context/ShopifyApi/Provider/ShopifyApiProvider */
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
