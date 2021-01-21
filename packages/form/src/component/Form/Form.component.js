import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace Form/Component/Form/Component/FormComponent */
export class FormComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    onSubmit = () => {
        // TODO: implement
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
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.onSubmit) }>
                { this.renderContent() }
            </form>
        );
    }
}

export default FormComponent;
