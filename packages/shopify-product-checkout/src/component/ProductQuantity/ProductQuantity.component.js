import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyProduct-Checkout/Component/ProductQuantity/Component/ProductQuantityComponent */
export class ProductQuantityComponent extends PureComponent {
    static contextType = ProductContext;

    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    renderQtyInput() {
        const {
            quantity,
            maxQuantity,
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
              max={ maxQuantity }
              value={ quantity }
              onChange={ onChange }
            />
        );
    }

    render() {
        return (
            <div block="ProductQuantity">
                { this.renderQtyInput() }
            </div>
        );
    }
}

export default ProductQuantityComponent;
