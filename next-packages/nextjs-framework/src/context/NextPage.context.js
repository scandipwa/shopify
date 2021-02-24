import { createContext } from 'react';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/export-level-one
const nextPageContext = createContext({ props: {} });
nextPageContext.displayName = 'NextPageProps';
export default nextPageContext;
