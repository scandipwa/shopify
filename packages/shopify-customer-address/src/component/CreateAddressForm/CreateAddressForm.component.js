import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import AddressForm from '../AddressForm';

/** @namespace ShopifyCustomerAddress/Component/CreateAddressForm/Component/CreateAddressFormComponent */
export class CreateAddressFormComponent extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    renderActions = () => (
        <button type="submit">
            Add Address
        </button>
    );

    render() {
        const {
            onSubmit
        } = this.props;

        return (
            <AddressForm
              onSubmit={ onSubmit }
              renderActions={ this.renderActions }
            />
        );
    }
}

export default CreateAddressFormComponent;
