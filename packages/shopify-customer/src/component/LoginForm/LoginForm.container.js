import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';

import CustomerContext from '../../context/Customer.context';
import LoginFormComponent from './LoginForm.component';

/** @namespace ShopifyCustomer/Component/LoginForm/Container/LoginFormContainer */
export class LoginFormContainer extends HigherOrderComponent {
    static contextType = CustomerContext;

    containerFunctions = {
        onSubmit: this.onSubmit.bind(this)
    };

    async onSubmit(data) {
        const { login } = this.context;
        await login(data);
    }
}

export default withHOC(LoginFormContainer, LoginFormComponent);
