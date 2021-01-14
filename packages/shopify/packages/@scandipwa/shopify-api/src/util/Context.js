/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

/** @namespace ShopifyApi/Util/Context/withContexts */
export const withContexts = (Component, contextOrContexts = []) => (props) => {
    const contextArray = Array.isArray(contextOrContexts) ? contextOrContexts : [contextOrContexts];

    const combinedConsumer = contextArray.reduce(
        (acc, Context) => (value) => (
            <Context.Consumer>
                { /** merge them into one object (is that safe? */ }
                { (contextValue) => acc({ ...value, ...contextValue }) }
            </Context.Consumer>
        ),
        (value) => <Component { ...value } />
    );

    return combinedConsumer(props);
};
