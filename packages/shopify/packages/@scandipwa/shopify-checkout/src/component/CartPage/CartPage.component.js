import { PureComponent } from 'react';

/** @namespace ShopifyCheckout/Component/CartPage/Component/CartPageComponent */
export class CartPageComponent extends PureComponent {
    renderContent() {
        return null;
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
