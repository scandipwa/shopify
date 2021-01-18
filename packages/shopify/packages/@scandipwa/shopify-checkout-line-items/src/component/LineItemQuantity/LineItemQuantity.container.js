import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';

import LineItemContext from '../../context/LineItems.context';
import LineItemQuantityComponent from './LineItemQuantity.component';

/** @namespace ShopifyCheckout-Cart/Component/LineItemQuantity/Container/LineItemQuantityContainer */
export class LineItemQuantityContainer extends HigherOrderComponent {
    static contextType = LineItemContext;

    containerFunctions = {
        onChange: this.onChange.bind(this)
    };

    onChange({ target: { value } }) {
        const { updateQuantity } = this.context;
        updateQuantity(+value);
    }
}

export default withHOC(
    LineItemQuantityContainer,
    LineItemQuantityComponent
);
