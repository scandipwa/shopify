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

    onSubmitSuccess() {
        history.push('/account');
    }

    async onSubmit(data) {
        const { login } = this.context;
        await login(data);
        this.onSubmitSuccess(data);
    }
}

export default withHOC(LoginFormContainer, LoginFormComponent);
