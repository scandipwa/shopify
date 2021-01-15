import { createSortedRenderList } from '@scandipwa/shopify-api/src/util/SortedMap';
import { PureComponent } from 'react';

/** @namespace ShopifyCheckout/Component/CartPage/Component/CartPageComponent */
export class CartPageComponent extends PureComponent {
    sortedRenderList = createSortedRenderList([]);

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
