import { createSortedRenderList } from '@scandipwa/nextjs-framework/src/util/SortedMap';
import { PureComponent } from 'react';

import CheckoutContext from '../../context/Checkout.context';

/** @namespace ShopifyNextjsCheckout/Component/CartPage/Component/CartPageComponent */
export class CartPageComponent extends PureComponent {
    static contextType = CheckoutContext;

    sortedRenderList = createSortedRenderList([]);

    renderContent() {
        return this.sortedRenderList.render();
    }

    render() {
        console.log('***', this);

        return (
            <div block="CartPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default CartPageComponent;
