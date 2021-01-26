import ShopContext from '@scandipwa/shopify-shop/src/context/Shop.context';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { PRICE_TEMPLATE } from './Price.config';

/** @namespace ShopifyProductPrices/Component/Price/Component/PriceComponent */
export class PriceComponent extends PureComponent {
    static contextType = ShopContext;

    static propTypes = {
        amount: PropTypes.string.isRequired
    };

    renderPrice() {
        const { shop: { moneyFormat } = {} } = this.context;
        const { amount } = this.props;

        return moneyFormat.replace(
            PRICE_TEMPLATE,
            parseFloat(amount).toFixed(2)
        );
    }

    render() {
        const { shop: { moneyFormat } = {} } = this.context;
        const { amount } = this.props;

        if (
            amount === undefined
            || !moneyFormat
        ) {
            return null;
        }

        return (
            <p block="Price">
                { this.renderPrice() }
            </p>
        );
    }
}

export default PriceComponent;
