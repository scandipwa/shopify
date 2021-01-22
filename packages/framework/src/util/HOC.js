import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/** @namespace Framework/Util/HOC/HigherOrderComponent */
export class HigherOrderComponent extends PureComponent {
    static propTypes = {
        componentOrComponentMap: PropTypes.oneOfType([
            PropTypes.objectOf(PropTypes.func),
            PropTypes.func
        ]).isRequired
    };

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

    render() {
        const { componentOrComponentMap: Component } = this.props;

        if (typeof Component === 'object') {
            throw new Error(
                `The ${ this.constructor.name } Higher-Order-Component recieved a component map. `
                + 'Please implement the "render" method in order to properly handle this case.'
            );
        }

        return (
            <Component
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

/** @namespace Framework/Util/HOC/withHOC */
export const withHOC = (HOC, componentOrComponentMap) => {
    const withComponent = (props) => createElement(HOC, { ...props, componentOrComponentMap });
    withComponent.displayName = 'withHOC';
    return withComponent;
};
