import { HigherOrderComponent, withHOC } from '@scandipwa/nextjs-framework/src/util/HOC';

import LineItemContext from '../../context/LineItems.context';
import LineItemQuantityComponent from './LineItemQuantity.component';

/** @namespace ShopifyNextjsCheckoutLineItems/Component/LineItemQuantity/Container/LineItemQuantityContainer */
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
