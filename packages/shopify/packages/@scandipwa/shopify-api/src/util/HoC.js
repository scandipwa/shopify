import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/** @namespace ShopifyApi/Util/HoC/HoC */
export class HoC extends PureComponent {
    static propTypes = {
        component: PropTypes.node.isRequired
    };

    containerFunctions = {};

    containerProps = () => {};

    render() {
        const { component: Component } = this.props;

        return (
            <Component
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

/** @namespace ShopifyApi/Util/HoC/withHoC */
export const withHoC = (HoC) => (component) => createElement(HoC, { component });
