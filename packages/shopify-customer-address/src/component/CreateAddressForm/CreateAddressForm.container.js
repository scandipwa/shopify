import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import CustomerContext from '@scandipwa/shopify-customer/src/context/Customer.context';

import CreateAddressFormComponent from './CreateAddressForm.component';

/**
 * Create address form container. Used to connect to Customer Context and declare event handlers
 * @namespace ShopifyCustomerAddress/Component/CreateAddressForm/Container/CreateAddressFormContainer */
export class CreateAddressFormContainer extends HigherOrderComponent {
    static contextType = CustomerContext;

    containerFunctions = {
        onSubmit: this.onSubmit.bind(this)
    };

    onSubmit(data) {
        const { createAddress } = this.context;
        return createAddress({ address: data });
    }
}

export default withHOC(CreateAddressFormContainer, CreateAddressFormComponent);
