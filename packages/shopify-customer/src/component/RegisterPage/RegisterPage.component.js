import Form from '@scandipwa/form/src/component/Form';
import FormError from '@scandipwa/form/src/component/FormError';
import { withUseFormContext } from '@scandipwa/form/src/util/withUseForm';
import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/** @namespace ShopifyCustomer/Component/RegisterPage/Component/RegisterPageComponent */
export class RegisterPageComponent extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    contextRenderList = createSortedRenderList([
        this.renderErrors.bind(this),
        this.renderFields.bind(this),
        this.renderSubmit.bind(this)
    ]);

    formFieldsRenderList = createSortedRenderList([
        this.renderFirstName.bind(this),
        this.renderLastName.bind(this),
        this.renderEmail.bind(this),
        this.renderPassword.bind(this)
    ]);

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

    renderSubmit() {
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

export default RegisterPageComponent;