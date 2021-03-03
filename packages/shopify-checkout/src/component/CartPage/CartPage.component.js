import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import CheckoutContext from '../../context/Checkout.context';

/** @namespace ShopifyCheckout/Component/CartPage/Component/CartPageComponent */
export class CartPageComponent extends PureComponent {
    static contextType = CheckoutContext;

    sortedRenderList = createSortedRenderMap({});

    renderContent() {
        return this.sortedRenderList.render();
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
