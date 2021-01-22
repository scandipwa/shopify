import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import { history } from '@scandipwa/router/src/component/Router/Router.component';

import CustomerContext from '../../context/Customer.context';
import RegisterPageComponent from './RegisterPage.component';

/** @namespace ShopifyCustomer/Component/RegisterPage/Container/RegisterPageContainer */
export class RegisterPageContainer extends HigherOrderComponent {
    static contextType = CustomerContext;

    containerFunctions = {
        onSubmit: this.onSubmit.bind(this)
    };

    onError(customerUserErrors, { setError }) {
        const formMessages = [];

        customerUserErrors.forEach((customerError) => {
            const {
                field,
                message
            } = customerError;

            if (!field) {
                formMessages.push(message);
                return;
            }

            // No need to clear them (assosiated)
            setError(field, {
                type: 'manual',
                message
            });
        });

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

export default withHOC(RegisterPageContainer, RegisterPageComponent);
