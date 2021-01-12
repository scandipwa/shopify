import { postMutation, postQuery } from '@scandipwa/graphql';
import { createContext } from 'react';

/** @namespace ShopifyApi/ApiClient/ApiClient */
export class ApiClient {
    // TODO: impleent runtime chache here

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
}

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const context = createContext(new ApiClient());
context.displayName = 'ShopifyAPIContext';
export default context;
