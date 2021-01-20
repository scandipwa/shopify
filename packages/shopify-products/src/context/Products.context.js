import { createContext } from 'react';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const productsContext = createContext({ product: {} });
productsContext.displayName = 'ShopifyProduct';
export default productsContext;
