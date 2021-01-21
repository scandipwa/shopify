import { PureComponent } from 'react';

import RegisterForm from '../RegisterForm';

/** @namespace ShopifyCustomer/Component/RegisterPage/Component/RegisterPageComponent */
export class RegisterPageComponent extends PureComponent {
    renderForm() {
        return <RegisterForm />;
    }

    render() {
        return (
            <div block="RegisterPage">
                { this.renderForm() }
            </div>
        );
    }
}

export default RegisterPageComponent;
