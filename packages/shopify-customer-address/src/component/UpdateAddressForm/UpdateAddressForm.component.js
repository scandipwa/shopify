import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import AddressForm from '../AddressForm';

/** @namespace ShopifyCustomerAddress/Component/UpdateAddressForm/Component/UpdateAddressFormComponent */
export class UpdateAddressFormComponent extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        formConfig: PropTypes.shape({}).isRequired
    };

    renderActions = () => (
        <button type="submit">
            Update Address
        </button>
    );

    render() {
        const {
            onSubmit,
            formConfig
        } = this.props;

        return (
            <AddressForm
              onSubmit={ onSubmit }
              formConfig={ formConfig }
              renderActions={ this.renderActions }
            />
        );
    }
}

export default UpdateAddressFormComponent;
