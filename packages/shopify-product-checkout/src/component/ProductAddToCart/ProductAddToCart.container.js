import { withContexts } from '@scandipwa/framework/src/util/Context';
import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import CheckoutContext from '@scandipwa/shopify-checkout/src/context/Checkout.context';
import { ProductType } from '@scandipwa/shopify-products/src/api/Products.type';
import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';
import PropTypes from 'prop-types';

import ProductAddToCartComponent from './ProductAddToCart.component';

/**
 * Product add to cart container. Used to connect with Product and Checkout contexts and pass down necessary properties to Add to cart component.
 * @namespace ShopifyProductCheckout/Component/ProductAddToCart/Container/ProductAddToCartContainer */
export class ProductAddToCartContainer extends HigherOrderComponent {
    static propTypes = {
        [ProductContext.displayName]: PropTypes.shape({
            product: ProductType.isRequired,
            quantity: PropTypes.number.isRequired
        }),
        [CheckoutContext.displayName]: PropTypes.shape({
            addVariantToCart: PropTypes.func.isRequired
        })
    };

    getIsVisible() {
        const {
            [ProductContext.displayName]: {
                product: {
                    availableForSale
                }
            }
        } = this.props;

        return !!availableForSale;
    }

    getIsDisabled() {
        const {
            [ProductContext.displayName]: {
                selectedVariant: {
                    availableForSale,
                    currentlyNotInStock
                }
            }
        } = this.props;

        return !availableForSale || !!currentlyNotInStock;
    }

    onAddToCartClick() {
        const {
            [ProductContext.displayName]: {
                selectedVariant,
                quantity
            },
            [CheckoutContext.displayName]: {
                addVariantToCart
            }
        } = this.props;

        addVariantToCart(selectedVariant, quantity);
    }

    containerFunctions = {
        onAddToCartClick: this.onAddToCartClick.bind(this)
    };

    containerProps = () => ({
        isVisible: this.getIsVisible(),
        isDisabled: this.getIsDisabled()
    });
}

export default withHOC(
    withContexts(ProductAddToCartContainer, [ProductContext, CheckoutContext]),
    ProductAddToCartComponent
);
