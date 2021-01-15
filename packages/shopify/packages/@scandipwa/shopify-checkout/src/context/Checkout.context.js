import { createContext } from 'react';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const context = createContext({ checkout: {} });
context.displayName = 'ShopifyCheckout';
export default context;
