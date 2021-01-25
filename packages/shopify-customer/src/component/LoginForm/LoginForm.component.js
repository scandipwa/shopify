/* eslint-disable */

import FieldForm from '@scandipwa/form/src/component/FieldForm';
import { withUseForm } from '@scandipwa/form/src/util/withUseForm';

/** @namespace ShopifyCustomer/Component/LoginForm/Component/LoginFormComponent */
export class LoginFormComponent extends FieldForm {
    // _defaultFieldList = [
    //     {
    //         name: 'email',
    //         render: this.renderEmail.bind(this)
    //     },
    //     {
    //         name: 'password',
    //         render: this.renderPassword.bind(this)
    //     }
    // ];

    __construct(...args) {
        super.__construct(...args);

        console.log({ 
            'instanceof FieldForm': this instanceof FieldForm,
            this: this
        });
    }

    renderEmail({ name, ref }) {
        return (
            <input
              name={ name }
              ref={ ref }
            />
        );
    }

    renderPassword({ name, ref }) {
        return (
            <input
              name={ name }
              ref={ ref }
            />
        );
    }
}

export default withUseForm(LoginFormComponent);
