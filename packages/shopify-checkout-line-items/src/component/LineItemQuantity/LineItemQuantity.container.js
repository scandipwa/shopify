import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';

import LineItemContext from '../../context/LineItems.context';
import LineItemQuantityComponent from './LineItemQuantity.component';

/** @namespace ShopifyCheckout-Line-Items/Component/LineItemQuantity/Container/LineItemQuantityContainer */
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
