import CheckoutContext from '@scandipwa/shopify-checkout/src/context/Checkout.context';
import { PureComponent } from 'react';

/** @namespace ShopifyCheckoutWeb/Component/CheckoutWebButton/Component/CheckoutWebButtonComponent */
export class CheckoutWebButtonComponent extends PureComponent {
    static contextType = CheckoutContext;

    render() {
        const { checkout: { webUrl } } = this.context;

        return (
            <a href={ webUrl }>
                Go to checkout
            </a>
        );
    }
}

export default CheckoutWebButtonComponent;
