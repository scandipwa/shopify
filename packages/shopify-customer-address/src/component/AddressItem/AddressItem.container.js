import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import CustomerContext from '@scandipwa/shopify-customer/src/context/Customer.context';

import { CustomerAddressType } from '../../api/CustomerAddress.type';
import AddressItemComponent from './AddressItem.component';

/** @namespace ShopifyCustomer-Address/Component/AddressItem/Container/AddressItemContainer */
export class AddressItemContainer extends HigherOrderComponent {
    static propTypes = {
        address: CustomerAddressType.isRequired
    };

    static contextType = CustomerContext;

    state = {
        isEditing: false
    };

    containerFunctions = {
        onEditClick: this.onEditClick.bind(this),
        onDeleteClick: this.onDeleteClick.bind(this)
    };

    containerProps = () => {
        const { address } = this.props;
        const { isEditing } = this.state;

        return {
            isEditing,
            address
        };
    };

    onDeleteClick() {
        const { deleteAddress } = this.context;
        const { address: { id } } = this.props;
        return deleteAddress({ id });
    }

    onEditClick() {
        this.setState(({ isEditing }) => ({ isEditing: !isEditing }));
    }
}

export default withHOC(AddressItemContainer, AddressItemComponent);
