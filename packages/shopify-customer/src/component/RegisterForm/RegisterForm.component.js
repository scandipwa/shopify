import Form from '@scandipwa/form/src/component/Form';
import FormError from '@scandipwa/form/src/component/FormError';
import { withUseFormContext } from '@scandipwa/form/src/util/withUseForm';
import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/** @namespace ShopifyCustomer/Component/RegisterForm/Component/RegisterFormComponent */
export class RegisterFormComponent extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    /**
     * A list of render methods used by register form component.
     * Read more: [SortedRenderMap](../../solutions/sortedmap-and-sortedrendermap.md)
     */
    contentRenderMap = createSortedRenderMap({
        registerFormErrors: this.renderErrors.bind(this),
        registerFormFields: this.renderFields.bind(this),
        registerFormActions: this.renderActions.bind(this)
    });

    /**
     * A list of field render methods used by the register form.
     * Read more: [SortedRenderMap](../../solutions/sortedmap-and-sortedrendermap.md)
     */
    formFieldsRenderMap = createSortedRenderMap({
        registerFormFirstName: this.renderFirstName.bind(this),
        registerFormLastName: this.renderLastName.bind(this),
        registerFormEmail: this.renderEmail.bind(this),
        registerFormPassword: this.renderPassword.bind(this)
    });

    renderLastName() {
        // TODO: use Input from UI here
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Last name"
                  autoComplete="family-name"
                  type="text"
                  name="lastName"
                  ref={ register }
                />
            ))
        );
    }

    renderFirstName() {
        // TODO: use Input from UI here
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="First name"
                  autoComplete="given-name"
                  type="text"
                  name="firstName"
                  ref={ register }
                />
            ))
        );
    }

    renderPassword() {
        // TODO: use Input from UI here
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
        // TODO: use Input from UI here
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
                Create
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

export default RegisterFormComponent;
