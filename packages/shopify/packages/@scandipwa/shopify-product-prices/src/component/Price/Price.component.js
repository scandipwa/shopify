import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyProduct-Prices/Component/Price/Component/PriceComponent */
export class PriceComponent extends PureComponent {
    static propTypes = {
        amount: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired
    };

    renderPrice() {
        const { amount } = this.props;
        return amount;
    }

    renderCurrency() {
        const { currency } = this.props;
        return currency;
    }

    render() {
        const { amount } = this.props;

        if (amount === undefined) {
            return null;
        }

        return (
            <p block="Price">
                { this.renderPrice() }
                { this.renderCurrency() }
            </p>
        );
    }
}

export default PriceComponent;
