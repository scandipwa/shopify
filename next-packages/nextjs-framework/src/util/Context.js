/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

/** @namespace NextjsFramework/Util/Context/withContexts */
export const withContexts = (Component, contextOrContexts = []) => {
    const withComponent = (props) => {
        const contextArray = Array.isArray(contextOrContexts) ? contextOrContexts : [contextOrContexts];

        const combinedConsumer = contextArray.reduce(
            (acc, Context) => (value) => (
                <Context.Consumer>
                    { /** merge them into one object (is that safe? */ }
                    { (contextValue) => {
                        const key = Context.displayName;

                        if (!key) {
                            throw new Error('"withContexts" expects "named" contexts only.');
                        }

                        return acc({ ...value, [key]: contextValue });
                    } }
                </Context.Consumer>
            ),
            (value) => <Component { ...value } />
        );

        return combinedConsumer(props);
    };

    withComponent.displayName = 'withContexts';

    return withComponent;
};
