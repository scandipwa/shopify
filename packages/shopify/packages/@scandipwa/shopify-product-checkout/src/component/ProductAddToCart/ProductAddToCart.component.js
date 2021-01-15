import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyProduct-Checkout/Component/ProductAddToCart/Component/ProductAddToCartComponent */
export class ProductAddToCartComponent extends PureComponent {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onAddToCartClick: PropTypes.func.isRequired
        // onQuantityChange: PropTypes.func.isRequired
    };

    renderQuantity() {
        return 'qty';
    }

    renderButton() {
        const {
            onAddToCartClick,
            isDisabled
        } = this.props;

        // TODO: use Button component here
        return (
            <button
              onClick={ onAddToCartClick }
              disabled={ isDisabled }
            >
                Add to cart
            </button>
        );
    }

    render() {
        const { isVisible } = this.props;

        if (!isVisible) {
            return null;
        }

        return (
            <div block="ProductAddToCart">
                { this.renderQuantity() }
                { this.renderButton() }
            </div>
        );
    }
}

export default ProductAddToCartComponent;
