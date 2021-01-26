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

    onSubmitSuccess() {
        history.push('/account');
    }

    async onSubmit(data) {
        const { register } = this.context;
        await register(data);
        this.onSubmitSuccess(data);
    }
}

export default withHOC(RegisterFormContainer, RegisterFormComponent);
