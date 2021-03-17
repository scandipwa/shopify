import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';

import LineItemContext from '../../context/LineItems.context';
import LineItemQuantityComponent from './LineItemQuantity.component';

/**
 * Conainer for line item block. Used to define event handlers and other logic.
 * @namespace ShopifyCheckoutLineItems/Component/LineItemQuantity/Container/LineItemQuantityContainer */
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
