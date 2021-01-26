import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import LineItemContext from '../../context/LineItems.context';

/** @namespace ShopifyCheckoutLineItems/Component/LineItemQuantity/Component/LineItemQuantityComponent */
export class LineItemQuantityComponent extends PureComponent {
    static contextType = LineItemContext;

    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    renderQtyInput() {
        const {
            quantity,
            selectedVariant: {
                sku
            }
        } = this.context;

        const { onChange } = this.props;

        return (
            <input
              type="number"
              name={ `${ sku }-qty` }
              min={ 1 }
              max={ Infinity }
              value={ quantity }
              onChange={ onChange }
            />
        );
    }

    render() {
        return (
            <div block="LineItemQuantity">
                { this.renderQtyInput() }
            </div>
        );
    }
}

export default LineItemQuantityComponent;
