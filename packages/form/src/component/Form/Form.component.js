import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { withUseForm } from '../../util/withUseForm';

/** @namespace Form/Component/Form/Component/FormComponent */
export class FormComponent extends PureComponent {
    static propTypes = {
        // Use "formConfig" to configure "useForm" options
        onSubmit: PropTypes.func,
        children: PropTypes.node.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        onSubmit: () => {}
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
        const { handleSubmit, onSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(onSubmit) }>
                { this.renderContent() }
            </form>
        );
    }
}

export default withUseForm(FormComponent);
