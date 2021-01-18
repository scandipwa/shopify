import { createSortedRenderList } from '@scandipwa/shopify-api/src/util/SortedMap';
import { PureComponent } from 'react';

import CheckoutContext from '../../context/Checkout.context';

/** @namespace ShopifyCheckout/Component/CartPage/Component/CartPageComponent */
export class CartPageComponent extends PureComponent {
    static contextType = CheckoutContext;

    sortedRenderList = createSortedRenderList([
        this.renderGoToCheckout.bind(this)
    ]);

    renderContent() {
        return this.sortedRenderList.render();
    }

    renderGoToCheckout() {
        const { checkout: { webUrl } } = this.context;

        return (
            <a href={ webUrl }>
                Go to checkout
            </a>
        );
    }

    render() {
        return (
            <div block="CartPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default CartPageComponent;
