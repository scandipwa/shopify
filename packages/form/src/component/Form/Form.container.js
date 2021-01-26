import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { UseFormType } from '../../type/Form.type';
import { withUseForm } from '../../util/withUseForm';

/** @namespace Form/Component/Form/Container/FormContainer */
export class FormContainer extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        children: PropTypes.node.isRequired,
        // Use "formConfig" to configure "useForm" options
        useForm: UseFormType.isRequired
    };

    static defaultProps = {
        onSubmit: () => {}
    };

    onSubmit = async (data) => {
        const {
            onSubmit,
            useForm,
            useForm: { setError }
        } = this.props;

        try {
            await onSubmit(data, useForm);
        } catch (e) {
            // In case you want to handle errors differently, implement the
            // try ... catch block around your onSubmit functions!
            if (e instanceof Error) {
                setError('form', {
                    type: 'manual',
                    message: e.message
                });
            } else {
                // handle non Error errors
                setError('form', {
                    type: 'manual',
                    message: e.toString()
                });
            }
        }
    };

    renderContent() {
        const { children } = this.props;

        return (
            <div block="Form">
                { children }
            </div>
        );
    }

    render() {
        const { useForm: { handleSubmit } } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.onSubmit) }>
                { this.renderContent() }
            </form>
        );
    }
}

export default withUseForm(FormContainer);
