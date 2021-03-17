import CheckoutContext from '@scandipwa/shopify-nextjs-checkout/src/context/Checkout.context';
import Link from 'next/link';
import { PureComponent } from 'react';

/** @namespace ShopifyNextjsCheckoutWeb/Component/CheckoutWebButton/Component/CheckoutWebButtonComponent */
export class CheckoutWebButtonComponent extends PureComponent {
    static contextType = CheckoutContext;

    render() {
        const { checkout: { webUrl } } = this.context;

        if (!webUrl) {
            return 'Loading button...';
        }

        return (
            <Link href={ webUrl }>
                Go to checkout
            </Link>
        );
    }
}

export default CheckoutWebButtonComponent;
