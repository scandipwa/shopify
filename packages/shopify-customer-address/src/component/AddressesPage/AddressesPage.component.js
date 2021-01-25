import CustomerContext from '@scandipwa/shopify-customer/src/context/Customer.context';
import { PureComponent } from 'react';

import AddressesFallbackPage from '../AddressesFallbackPage';
import AddressItem from '../AddressItem';
import CreateAddressForm from '../CreateAddressForm';

/** @namespace ShopifyCustomer-Address/Component/AddressesPage/Component/AddressesPageComponent */
export class AddressesPageComponent extends PureComponent {
    static contextType = CustomerContext;

    renderAddressForm() {
        return (
            <CreateAddressForm />
        );
    }

    renderAddress = (address) => {
        const { id } = address;

        return (
            <AddressItem
              key={ id }
              address={ address }
            />
        );
    };

    renderAddresses() {
        const { customer: { addresses } } = this.context;
        return addresses.map(this.renderAddress);
    }

    renderLoading() {
        return (
            <AddressesFallbackPage />
        );
    }

    render() {
        const { isCustomerLoading } = this.context;

        if (isCustomerLoading) {
            return this.renderLoading();
        }

        return (
            <div block="LoginPage">
                { this.renderAddresses() }
                { this.renderAddressForm() }
            </div>
        );
    }
}

export default AddressesPageComponent;
