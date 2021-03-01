import { withUseForm } from '@scandipwa/form/src/util/withUseForm';
import { PureComponent } from 'react';

import RegisterForm from '../RegisterForm';

/**
 * Login page component.
 * @namespace ShopifyCustomer/Component/RegisterPage/Component/RegisterPageComponent */
export class RegisterPageComponent extends PureComponent {
    renderForm() {
        return (
            <RegisterForm />
        );
    }

    render() {
        return (
            <div block="RegisterPage">
                { this.renderForm() }
            </div>
        );
    }
}

export default withUseForm(RegisterPageComponent);
