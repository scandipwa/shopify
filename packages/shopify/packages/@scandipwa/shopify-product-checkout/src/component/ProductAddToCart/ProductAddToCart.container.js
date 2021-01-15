import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';
import { withContexts } from '@scandipwa/shopify-api/src/util/Context';
import CheckoutContext from '@scandipwa/shopify-checkout/src/context/Checkout.context';
import { ProductType } from '@scandipwa/shopify-products/src/api/Products.type';
import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';

import ProductAddToCartComponent from './ProductAddToCart.component';

/** @namespace ShopifyProduct-Checkout/Component/ProductAddToCart/Container/ProductAddToCartContainer */
export class ProductAddToCartContainer extends HigherOrderComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    state = {
        quantity: 1
    };

    getIsVisible() {
        const { product: { availableForSale } } = this.props;
        return !!availableForSale;
    }

    getIsDisabled() {
        const {
            selectedVariant: {
                availableForSale,
                currentlyNotInStock
            }
        } = this.props;

        return !availableForSale || !!currentlyNotInStock;
    }

    onQuantityChange(quantity) {
        this.setState({ quantity });
    }

    onAddToCartClick() {
        const { selectedVariant, addVariantToCart } = this.props;
        const { quantity } = this.state;
        addVariantToCart(selectedVariant, quantity);
    }

    containerFunctions = {
        onAddToCartClick: this.onAddToCartClick.bind(this),
        onQuantityChange: this.onQuantityChange.bind(this)
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
