import { createContext } from 'react';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const context = createContext({ product: {} });
context.displayName = 'ShopifyProduct';
export default context;
