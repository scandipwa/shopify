import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import { history } from '@scandipwa/router/src/component/Router/Router.component';

import CustomerContext from '../../context/Customer.context';
import LoginFormComponent from './LoginForm.component';

/** @namespace ShopifyCustomer/Component/LoginForm/Container/LoginFormContainer */
export class LoginFormContainer extends HigherOrderComponent {
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
        const { login } = this.context;

        login(data).then(
            /** @namespace ShopifyCustomer/Component/LoginForm/Container/login/then */
            (res) => this.onSubmitSuccess(res),
            /** @namespace ShopifyCustomer/Component/LoginForm/Container/login/then */
            (e) => this.onError(e, useFormProps)
        );
    }
}

export default withHOC(LoginFormContainer, LoginFormComponent);
