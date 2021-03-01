import Form from '@scandipwa/form/src/component/Form';
import FormError from '@scandipwa/form/src/component/FormError';
import { withUseFormContext } from '@scandipwa/form/src/util/withUseForm';
import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/**
 * Address form component
 * @namespace ShopifyCustomerAddress/Component/AddressForm/Component/AddressFormComponent */
export class AddressFormComponent extends PureComponent {
    static propTypes = {
        formConfig: PropTypes.shape({}).isRequired,
        onSubmit: PropTypes.func.isRequired,
        renderActions: PropTypes.func.isRequired
    };

    contextRenderList = createSortedRenderMap({
        addressFormErrors: this.renderErrors.bind(this),
        addressFormFields: this.renderFields.bind(this),
        addressFormActions: this.renderActions.bind(this)
    });

    formFieldsRenderList = createSortedRenderMap({
        addressFormFirstName: this.renderFirstName.bind(this),
        addressFormLastName: this.renderLastName.bind(this),
        addressFormCompany: this.renderCompany.bind(this),
        addressFormAddress1: this.renderAddress1.bind(this),
        addressFormAddress2: this.renderAddress2.bind(this),
        addressFormCity: this.renderCity.bind(this),
        addressFormCountry: this.renderCountry.bind(this),
        addressFormProvinceCode: this.renderProvinceCode.bind(this),
        addressFormZip: this.renderZip.bind(this),
        addressFormPhone: this.renderPhone.bind(this)
    });

    renderFirstName() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  ref={ register() }
                />
            ))
        );
    }

    renderLastName() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  ref={ register() }
                />
            ))
        );
    }

    renderCompany() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Company"
                  type="text"
                  name="company"
                  ref={ register() }
                />
            ))
        );
    }

    renderAddress1() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Address 1"
                  type="text"
                  name="address1"
                  ref={ register() }
                />
            ))
        );
    }

    renderAddress2() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Address 2"
                  type="text"
                  name="address2"
                  ref={ register() }
                />
            ))
        );
    }

    renderCity() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="City"
                  type="text"
                  name="city"
                  ref={ register() }
                />
            ))
        );
    }

    renderCountry() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Country"
                  type="text"
                  name="country"
                  ref={ register() }
                />
            ))
        );
    }

    renderProvinceCode() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Province Code"
                  type="text"
                  name="province"
                  ref={ register() }
                />
            ))
        );
    }

    renderZip() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Zip"
                  type="text"
                  name="zip"
                  ref={ register() }
                />
            ))
        );
    }

    renderPhone() {
        // TODO: use Input from UI here (via Field)
        return createElement(
            withUseFormContext(({ useForm: { register } }) => (
                <input
                  placeholder="Phone"
                  type="text"
                  name="phone"
                  ref={ register() }
                />
            ))
        );
    }

    renderFields() {
        return this.formFieldsRenderList.render();
    }

    renderActions() {
        const { renderActions } = this.props;
        return renderActions();
    }

    renderErrors() {
        return <FormError />;
    }

    renderContent() {
        return this.contextRenderList.render();
    }

    render() {
        const {
            onSubmit,
            formConfig
        } = this.props;

        return (
            <Form
              formConfig={ formConfig }
              onSubmit={ onSubmit }
            >
                { this.renderContent() }
            </Form>
        );
    }
}

export default AddressFormComponent;
