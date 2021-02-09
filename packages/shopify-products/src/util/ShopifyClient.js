import { postMutation, postQuery } from '@scandipwa/graphql';

/** @namespace ShopifyProducts/Util/ShopifyClient/ShopifyClient */
export class ShopifyClient {
    config = {
        shopifyToken: process.env.REACT_APP_SHOPIFY_TOKEN,
        shopifyDomain: process.env.REACT_APP_SHOPIFY_DOMAIN
    };

    _getFormattedOptions() {
        const { shopifyToken, shopifyDomain } = this.config;

        return {
            endpoint: shopifyDomain,
            headers: {
                'X-Shopify-Storefront-Access-Token': shopifyToken
            }
        };
    }

    postMutation = (mutation) => postMutation(mutation, this._getFormattedOptions());

    postQuery = (query) => postQuery(query, this._getFormattedOptions());
}

export default new ShopifyClient();
