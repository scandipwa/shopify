import Price from '@scandipwa/shopify-product-prices/src/component/Price';
import { PureComponent } from 'react';

import LineItemContext from '../../context/LineItems.context';

/** @namespace ShopifyCheckoutLineItems/Component/LineItemPrice/Component/LineItemPriceComponent */
export class LineItemPriceComponent extends PureComponent {
    static contextType = LineItemContext;

    renderPrice() {
        const {
            selectedVariant: {
                price: {
                    amount,
                    currencyCode
                }
            }
        } = this.context;

        return (
            <Price
              amount={ amount }
              currency={ currencyCode }
            />
        );
    }

    render() {
        return (
            <div block="ItemPriceComponent">
                { this.renderPrice() }
            </div>
        );
    }
}

export default LineItemPriceComponent;
