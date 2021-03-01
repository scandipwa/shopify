import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';

import { CheckoutLineItemType } from '../../api/CheckoutLineItems.type';
import LineItemsProvider from '../../context/LineItems.provider';
import LineItemComponent from './LineItem.component';

/**
 * Line item block container. Used to initialize the Line Items Context.
 * @namespace ShopifyCheckoutLineItems/Component/LineItem/Container/LineItemContainer */
export class LineItemContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        lineItem: CheckoutLineItemType.isRequired
    };

    render() {
        const { lineItem } = this.props;

        return (
            <LineItemsProvider
              lineItem={ lineItem }
            >
                { super.render() }
            </LineItemsProvider>
        );
    }
}

export default withHOC(LineItemContainer, LineItemComponent);
