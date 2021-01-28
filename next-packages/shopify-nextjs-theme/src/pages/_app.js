/* eslint-disable react/prop-types */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

/** @namespace ShopifyNextjsTheme/Pages/_app/App */
export const App = ({ Component, pageProps }) => (
    <div className="App">
        <Component { ...pageProps } />
    </div>
);

export default App;
