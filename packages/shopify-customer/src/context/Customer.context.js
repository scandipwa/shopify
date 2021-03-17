import { createContext } from 'react';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const CustomerContext = createContext({ checkout: {} });
CustomerContext.displayName = 'ShopifyCustomer';
export default CustomerContext;
