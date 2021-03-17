import { createContext } from 'react';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const CheckoutContext = createContext({ checkout: {} });
CheckoutContext.displayName = 'ShopifyCheckout';
export default CheckoutContext;
