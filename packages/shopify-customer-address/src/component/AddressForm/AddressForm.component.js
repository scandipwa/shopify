import Form from '@scandipwa/form/src/component/Form';
import FormError from '@scandipwa/form/src/component/FormError';
import { withUseFormContext } from '@scandipwa/form/src/util/withUseForm';
import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
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

    /**
     * A list of render methods used by address form component
     * @extPoint Inject render methods to be displayed in address form component
     * @extExample (member, instance) => {
     *     member.addItemToPosition(() => <MyComponent />);
     *     return member;
     * }
     */
    contextRenderList = createSortedRenderList([
        this.renderErrors.bind(this),
        this.renderFields.bind(this),
        this.renderActions.bind(this)
    ]);

    /**
     * A list of render methods used by the address form
     * @extPoint Inject render methods to be displayed in the address form
     * @extExample (member, instance) => {
     *     member.addItemToPosition(() => <MyField />);
     *     return member;
     * }
     */
    formFieldsRenderList = createSortedRenderList([
        this.renderFirstName.bind(this),
        this.renderLastName.bind(this),
        this.renderCompany.bind(this),
        this.renderAddress1.bind(this),
        this.renderAddress2.bind(this),
        this.renderCity.bind(this),
        this.renderCountry.bind(this),
        this.renderProvinceCode.bind(this),
        this.renderZip.bind(this),
        this.renderPhone.bind(this)
    ]);

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
