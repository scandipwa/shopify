/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { ErrorMessage } from '@hookform/error-message';
// import { createSortedList } from '@scandipwa/framework/src/util/SortedMap';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Controller } from 'react-hook-form';

/** @namespace Form/Component/FieldForm/Component/FieldFormComponent */
export class FieldFormComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        errors: PropTypes.shape({}).isRequired
    };

    // fieldRenderList = createSortedList([]);

    renderFieldError = ({ message }) => (
        <p block="FieldForm" elem="Error">{ message }</p>
    );

    renderField = (controllerProps) => {
        const { errors } = this.props;
        const { name } = controllerProps;

        return (
            <div block="FieldForm" elem="Field">
                <Controller { ...controllerProps } />
                <ErrorMessage
                  errors={ errors }
                  name={ name }
                  render={ this.renderFieldError }
                />
            </div>
        );
    };

    renderContent() {
        // return this.fieldRenderList.getSortedArray().map(this.renderField);
        return 'test';
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form
              onSubmit={ handleSubmit(this.onSubmit) }
              block="FieldForm"
            >
                { this.renderContent() }
            </form>
        );
    }
}

export default FieldFormComponent;
