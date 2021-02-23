import { postMutation as originalPostMutation, postQuery as originalPostQuery } from '@scandipwa/graphql';

/** @namespace ShopifyNextjsApi/Api/Request/getConfig */
export const getConfig = () => ({
    // TODO: use ENV VARS
    token: 'be9aebb10d5e83f81026058ea5ad1d76',
    domain: 'https://scandipwa1.myshopify.com/api/graphql'
});

/** @namespace ShopifyNextjsApi/Api/Request/getFormattedOptions */
export const getFormattedOptions = () => {
    const { token, domain } = getConfig();

    // TODO: for language add "Accept-Language" header

    return {
        endpoint: domain,
        headers: {
            'X-Shopify-Storefront-Access-Token': token
        }
    };
};

/** @namespace ShopifyNextjsApi/Api/Request/postMutation */
export const postMutation = (mutations) => originalPostMutation(mutations, getFormattedOptions());

/** @namespace ShopifyNextjsApi/Api/Request/postQuery */
export const postQuery = (queries) => originalPostQuery(queries, getFormattedOptions());
