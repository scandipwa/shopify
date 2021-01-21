import { PureComponent } from 'react';

import LoginForm from '../LoginForm';

/** @namespace ShopifyCustomer/Component/LoginPage/Component/LoginPageComponent */
export class LoginPageComponent extends PureComponent {
    renderForm() {
        return (
            <LoginForm />
        );
    }

    render() {
        return (
            <div block="LoginPage">
                { this.renderForm() }
            </div>
        );
    }
}

export default LoginPageComponent;
