/* eslint-disable no-continue */
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/** @namespace NextjsFramework/Util/HOC/HigherOrderComponent */
export class HigherOrderComponent extends PureComponent {
    static propTypes = {
        componentOrComponentMap: PropTypes.oneOfType([
            PropTypes.objectOf(PropTypes.func),
            PropTypes.func
        ]).isRequired
    };

    _memorizedProps = {};

    containerFunctions = {};

    containerProps = () => {};

    _getComponentByKey(key) {
        const {
            componentOrComponentMap: {
                [key]: Component
            }
        } = this.props;

        return Component;
    }

    _compareMemorizedProps(newProps) {
        const entries = Object.entries(newProps);

        // eslint-disable-next-line fp/no-let
        for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            const memorizedValue = this._memorizedProps[key];

            if (!memorizedValue) {
                this._memorizedProps[key] = value;
                continue;
            }

            try {
                // TODO: check if simply comparing the values does improve the accuracy
                // JSON stringify is kinda-slow, investigate if we can do better?
                // Most probably we do not need this, the question is how not to
                // create the same object over-and-over again with containerProps?
                // V8 however prefers JSON.stringify over destruction...
                // Need to dig into this later!

                if (JSON.stringify(value) !== JSON.stringify(memorizedValue)) {
                    this._memorizedProps[key] = value;
                }
            } catch (e) {
                // if the object was not serilizable - just force set new value
                this._memorizedProps[key] = value;
            }

            // in all other cases keep the object unchanged
        }
    }

    render() {
        const { componentOrComponentMap: Component } = this.props;

        if (typeof Component === 'object') {
            throw new Error(
                `The ${ this.constructor.name } Higher-Order-Component recieved a component map. `
                + 'Please implement the "render" method in order to properly handle this case.'
            );
        }

        const newProps = {
            ...this.containerFunctions,
            ...this.containerProps()
        };

        // this function is used to memorize the result of
        // containerProps and containerFunctions
        this._compareMemorizedProps(newProps);

        return (
            // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
            <Component { ...this._memorizedProps } />
        );
    }
}

/** @namespace NextjsFramework/Util/HOC/withHOC */
export const withHOC = (HOC, componentOrComponentMap) => {
    const withComponent = (props) => createElement(HOC, { ...props, componentOrComponentMap });
    withComponent.displayName = 'withHOC';
    return withComponent;
};
