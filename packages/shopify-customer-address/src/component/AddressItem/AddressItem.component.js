import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CustomerAddressType } from '../../api/CustomerAddress.type';
import FormattedAddress from '../FormattedAddress';
import UpdateAddressForm from '../UpdateAddressForm';

/**
 * Address item component
 * @namespace ShopifyCustomerAddress/Component/AddressItem/Component/AddressItemComponent */
export class AddressItemComponent extends PureComponent {
    static propTypes = {
        onEditClick: PropTypes.func.isRequired,
        onDeleteClick: PropTypes.func.isRequired,
        isEditing: PropTypes.bool.isRequired,
        address: CustomerAddressType.isRequired
    };

    renderPreview() {
        const { address } = this.props;

        return (
            <FormattedAddress
              address={ address }
            />
        );
    }

    renderEditingAddress() {
        const { address, isEditing } = this.props;

        if (!isEditing) {
            return null;
        }

        return (
            <UpdateAddressForm
              address={ address }
            />
        );
    }

    renderEditAction() {
        const {
            isEditing,
            onEditClick
        } = this.props;

        if (isEditing) {
            return (
                <button
                  type="button"
                  onClick={ onEditClick }
                >
                    Cancel
                </button>
            );
        }

        return (
            <button
              type="button"
              onClick={ onEditClick }
            >
                Edit
            </button>
        );
    }

    renderDeleteAction() {
        const { onDeleteClick } = this.props;

        return (
            <button
              type="button"
              onClick={ onDeleteClick }
            >
                Delete
            </button>
        );
    }

    renderActions() {
        return (
            <div block="AddressItem" elem="Actions">
                { this.renderEditAction() }
                { this.renderDeleteAction() }
            </div>
        );
    }

    render() {
        return (
            <div block="AddressItem">
                { this.renderPreview() }
                { this.renderEditingAddress() }
                { this.renderActions() }
            </div>
        );
    }
}

export default AddressItemComponent;
