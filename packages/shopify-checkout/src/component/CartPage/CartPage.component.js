import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import CheckoutContext from '../../context/Checkout.context';

/**
 * Cart page component
 * @namespace ShopifyCheckout/Component/CartPage/Component/CartPageComponent */
export class CartPageComponent extends PureComponent {
    static contextType = CheckoutContext;

    /**
     * The list of sections to be displayed on the cart page
     * @extPoint Display new sections on the cart page
     * @extExample (member, instance) => {
     *      member.addItem(() => <MyCartSection />, 'someKey');
     *      return member;
     * }
     */
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
