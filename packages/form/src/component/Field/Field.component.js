/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import { ErrorMessage } from '@hookform/error-message';
// import { createSortedList } from '@scandipwa/framework/src/util/SortedMap';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Controller } from 'react-hook-form';

import { withUseFormContext } from '../../util/withUseForm';

/** @namespace Form/Component/Field/Component/FieldComponent */
export class FieldComponent extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        defaultValue: PropTypes.any,
        renderError: PropTypes.func,
        renderInput: PropTypes.func,
        name: PropTypes.string.isRequired,
        rules: PropTypes.shape({}),
        errors: PropTypes.shape({}).isRequired
    };

    static defaultProps = {
        rules: {},
        defaultValue: '',
        renderInput: ({ name, ref, onChange }) => (
            <input
              name={ name }
              ref={ ref }
              onChange={ onChange }
            />
        ),
        renderError: ({ message }) => (
            <p block="FieldForm" elem="Error">
                { message }
            </p>
        )
    };

    renderController() {
        const {
            name,
            rules,
            defaultValue,
            renderInput
        } = this.props;

        return (
            <Controller
              name={ name }
              rules={ rules }
              render={ renderInput }
              defaultValue={ defaultValue }
            />
        );
    }

    renderError() {
        const {
            errors,
            renderError,
            name
        } = this.props;

        return (
            <ErrorMessage
              errors={ errors }
              name={ name }
              render={ renderError }
            />
        );
    }

    render() {
        return (
            <div block="Field">
                { this.renderController() }
                { this.renderError() }
            </div>
        );
    }
}

export default withUseFormContext(FieldComponent);
