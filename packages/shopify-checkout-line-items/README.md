# @scandipwa/shopify-checkout-line-items

This module connects `@scandipwa/shopify-checkout` module with `@scandipwa/shopify-products` module to allow querying and displaying products in the checkout (cart).

## Declarations
1. Allows to communicate with the Shopify Storefront API to get, remove, update, and add line items to the checkout (cart).
2. Presentational and Container components to render UI elements for line items in the checkout (cart).
3. Adds Line Items Context to store and provide line item-related data to children components.

## Extensions
1. Adds line item block to the checkout (cart) page.
2. Updates Checkout Context with functions to manage line items.
3. Adds line item processing to Checkout processor.
4. Extends Checkout get query to include line items.
