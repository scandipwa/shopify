import { createContext } from 'react';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const ShopContext = createContext({ checkout: {} });
ShopContext.displayName = 'ShopifyShop';
export default ShopContext;
