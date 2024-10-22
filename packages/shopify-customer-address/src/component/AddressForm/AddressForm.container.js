import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import PropTypes from 'prop-types';

import AddressFormComponent from './AddressForm.component';

/**
 * Address form container. Used to declare handler function and format props from parent component to pass down to Address Form component.
 * @namespace ShopifyCustomerAddress/Component/AddressForm/Container/AddressFormContainer */
export class AddressFormContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        formConfig: PropTypes.shape({}),
        renderActions: PropTypes.func,
        onError: PropTypes.func,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        formConfig: {},
        renderActions: () => {},
        onError: (customerUserErrors, { setError }) => {
            const formMessages = customerUserErrors.map(
                ({ message }) => message
            );

            setError('form', {
                type: 'manual',
                message: formMessages.join('. ')
            });
        }
    };

    containerFunctions = {
        onSubmit: this.onSubmit.bind(this)
    };

    containerProps = () => {
        const {
            renderActions,
            formConfig
        } = this.props;

        return {
            renderActions,
            formConfig
        };
    };

    onSubmit(data, useFormProps) {
        const { onSubmit, onError } = this.props;

        onSubmit(data, useFormProps).catch(
            /** @namespace ShopifyCustomerAddress/Component/AddressForm/Container/onSubmit/catch */
            (e) => onError(e, useFormProps)
        );
    }
}

export default withHOC(AddressFormContainer, AddressFormComponent);
