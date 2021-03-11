import Form from '@scandipwa/form/src/component/Form';
import FormError from '@scandipwa/form/src/component/FormError';
import { withUseFormContext } from '@scandipwa/form/src/util/withUseForm';
import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/**
 * Login form component
 * @namespace ShopifyCustomer/Component/LoginForm/Component/LoginFormComponent */
export class LoginFormComponent extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    /**
     * A list of render methods used by login form component
     * @extPoint Inject render methods to be displayed in login form
     * @extExample (member, instance) => {
     *     member.addItem(() => <MyComponent />, 'someKey');
     *     return member;
     * }
     */
    contentRenderMap = createSortedRenderMap({
        loginFormErrors: this.renderErrors.bind(this),
        loginFormFields: this.renderFields.bind(this),
        loginFormActions: this.renderActions.bind(this)
    });

    /**
     * A list of field render methods used by the login form
     * @extPoint Inject field render methods to be displayed in the login form
     * @extExample (member, instance) => {
     *     member.addItem(() => <MyField />, 'someKey');
     *     return member;
     * }
     */
    formFieldsRenderMap = createSortedRenderMap({
        loginFormEmail: this.renderEmail.bind(this),
        loginFormPassword: this.renderPassword.bind(this)
    });

    renderPassword() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Password"
                  autoComplete="password"
                  type="password"
                  name="password"
                  ref={ register }
                />
            ))
        );
    }

    renderEmail() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Email"
                  autoComplete="email"
                  type="text"
                  name="email"
                  ref={ register }
                />
            ))
        );
    }

    renderFields() {
        return this.formFieldsRenderList.render();
    }

    renderActions() {
        return (
            <button type="submit">
                Sign In
            </button>
        );
    }

    renderErrors() {
        return <FormError />;
    }

    renderContent() {
        return this.contextRenderList.render();
    }

    render() {
        const { onSubmit } = this.props;

        return (
            <Form onSubmit={ onSubmit }>
                { this.renderContent() }
            </Form>
        );
    }
}

export default LoginFormComponent;
