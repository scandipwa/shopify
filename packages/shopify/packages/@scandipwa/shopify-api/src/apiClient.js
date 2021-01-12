import { postMutation, postQuery } from '@scandipwa/graphql';
import { createContext } from 'react';

/** @namespace ShopifyApi/ApiClient/ApiClient */
export class ApiClient {
    displayName = 'ShopifyAPIContext';

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

export default createContext(new ApiClient());
