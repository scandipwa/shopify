import Field from '@scandipwa/form/src/component/Field';
import Form from '@scandipwa/form/src/component/Form';
import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyCustomer/Component/LoginForm/Component/LoginFormComponent */
export class LoginFormComponent extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    formFieldsRenderList = createSortedRenderList([
        this.renderEmailField.bind(this),
        this.renderPasswordField.bind(this)
    ]);

    renderPassword = ({ name, ref, onChange }) => (
        // TODO: use Input from UI here
        <input
          placeholder="Password"
          autoComplete="password"
          type="password"
          name={ name }
          ref={ ref }
          // eslint-disable-next-line react/jsx-no-bind
          onChange={ (e) => onChange(e.target.value) }
        />
    );

    renderPasswordField() {
        return (
            <Field
              name="password"
              renderInput={ this.renderPassword }
            />
        );
    }

    renderEmail = ({ name, ref, onChange }) => (
        // TODO: use Input from UI here
        <input
          placeholder="Email"
          autoComplete="email"
          type="text"
          name={ name }
          ref={ ref }
          // eslint-disable-next-line react/jsx-no-bind
          onChange={ (e) => onChange(e.target.value) }
        />
    );

    renderEmailField() {
        return (
            <Field
              name="email"
              renderInput={ this.renderEmail }
            />
        );
    }

    renderFields() {
        return this.formFieldsRenderList.render();
    }

    renderSubmit() {
        return (
            <button type="submit">
                Sign In
            </button>
        );
    }

    render() {
        const { onSubmit } = this.props;

        return (
            <Form onSubmit={ onSubmit }>
                { this.renderFields() }
                { this.renderSubmit() }
            </Form>
        );
    }
}

export default LoginFormComponent;
