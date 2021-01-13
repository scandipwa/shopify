import { createContext } from 'react';

/** @namespace ShopifyProducts/Context/Product/Product */
export class Product {
    __construct(product = {}) {
        this.product = product;
    }
}

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const context = createContext(new Product());
context.displayName = 'ShopifyProduct';
export default context;
