/* eslint-disable react/prop-types */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import AppComponent from '@scandipwa/nextjs-framework/src/component/App/App.component';

/** @namespace ShopifyNextjsTheme/Pages/_app/App */
export const App = ({ Component, pageProps }) => (
    <AppComponent>
        <Component { ...pageProps } />
    </AppComponent>
);

export default App;
