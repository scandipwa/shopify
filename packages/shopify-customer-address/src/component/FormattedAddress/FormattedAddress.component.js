// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CustomerAddressType } from '../../api/CustomerAddress.type';

/**
 * Formatted address component.
 * @namespace ShopifyCustomerAddress/Component/FormattedAddress/Component/FormattedAddressComponent */
export class FormattedAddressComponent extends PureComponent {
    static propTypes = {
        address: CustomerAddressType.isRequired
    };

    renderFormattedLine = (line, i) => (
        <p key={ i }>{ line }</p>
    );

    renderTitle = (title) => (
        <h3 key="title">{ title }</h3>
    );

    renderFormatted() {
        const { address: { formatted } } = this.props;
        const title = formatted.shift();

        return [
            this.renderTitle(title),
            ...formatted.map(this.renderFormattedLine)
        ];
    }

    render() {
        return (
            <div block="FormattedAddress">
                { this.renderTitle() }
                { this.renderFormatted() }
            </div>
        );
    }
}

export default FormattedAddressComponent;
