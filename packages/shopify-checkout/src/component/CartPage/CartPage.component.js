import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import CheckoutContext from '../../context/Checkout.context';

/**
 * Cart page component
 * @namespace ShopifyCheckout/Component/CartPage/Component/CartPageComponent */
export class CartPageComponent extends PureComponent {
    static contextType = CheckoutContext;

    sortedRenderMap = createSortedRenderMap({});

    renderContent() {
        return this.sortedRenderMap.render();
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
