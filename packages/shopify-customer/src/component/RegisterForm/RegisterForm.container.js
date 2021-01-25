import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import { history } from '@scandipwa/router/src/component/Router/Router.component';

import CustomerContext from '../../context/Customer.context';
import RegisterFormComponent from './RegisterForm.component';

/** @namespace ShopifyCustomer/Component/RegisterForm/Container/RegisterFormContainer */
export class RegisterFormContainer extends HigherOrderComponent {
    static contextType = CustomerContext;

    containerFunctions = {
        onSubmit: this.onSubmit.bind(this)
    };

    onError(customerUserErrors, { setError }) {
        const formMessages = customerUserErrors.map(
            ({ message }) => message
        );

        setError('form', {
            type: 'manual',
            message: formMessages.join('. ')
        });
    }

    onSubmitSuccess() {
        history.push('/account');
    }

    async onSubmit(data, useFormProps) {
        const { register } = this.context;

        try {
            await register(data);
            this.onSubmitSuccess();
        } catch (e) {
            this.onError(e, useFormProps);
        }
    }
}

export default withHOC(RegisterFormContainer, RegisterFormComponent);
