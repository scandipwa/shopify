import CheckoutContext from '@scandipwa/shopify-checkout/src/context/Checkout.context';
import { PureComponent } from 'react';

import LineItem from '../LineItem';
import LineItemFallback from '../LineItemFallback';

/** @namespace ShopifyCheckoutLineItems/Component/LineItems/Component/LineItemsComponent */
export class LineItemsComponent extends PureComponent {
    static contextType = CheckoutContext;

    renderItem = (item, i) => (
        <LineItem
          key={ i }
          lineItem={ item }
        />
    );

    renderItems = () => {
        const { checkout: { lineItems } } = this.context;
        return lineItems.map(this.renderItem);
    };

    renderPlaceholder = () => (
        <LineItemFallback />
    );

    render() {
        return (
            <div block="LineItems">
                { this.renderItems() }
            </div>
        );
    }
}

export default LineItemsComponent;
