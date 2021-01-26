import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import CustomerContext from '@scandipwa/shopify-customer/src/context/Customer.context';

import { CustomerAddressType } from '../../api/CustomerAddress.type';
import UpdateAddressFormComponent from './UpdateAddressForm.component';

/** @namespace ShopifyCustomerAddress/Component/UpdateAddressForm/Container/UpdateAddressFormContainer */
export class UpdateAddressFormContainer extends HigherOrderComponent {
    static PropTypes = {
        ...HigherOrderComponent.propTypes,
        address: CustomerAddressType.isRequired
    };

    static contextType = CustomerContext;

    containerFunctions = {
        onSubmit: this.onSubmit.bind(this)
    };

    getFormConfig() {
        const { address } = this.props;

        return {
            defaultValues: address
        };
    }

    containerProps = () => ({
        formConfig: this.getFormConfig()
    });

    onSubmit(data) {
        const { updateAddress } = this.context;
        const { address: { id } } = this.props;
        return updateAddress({ address: data, id });
    }
}

export default withHOC(UpdateAddressFormContainer, UpdateAddressFormComponent);
