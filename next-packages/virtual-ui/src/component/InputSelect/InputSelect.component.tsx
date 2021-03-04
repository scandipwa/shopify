import MenuItem from '@material-ui/core/MenuItem';
import MaterialSelect from '@material-ui/core/Select';
import { InputSelectProps } from '@scandipwa/ui-api';
import React from 'react';
import { PureComponent } from 'react';
import { InputProps } from '../../util/Input';

export type InputSelectComponentProps = InputProps & Pick<
    InputSelectProps,
    'onChange' | 'placeholder' | 'options' | 'value' | 'defaultValue'
>;

/** @namespace MaterialUi/Component/InputSelect/Component */
export class InputSelect extends PureComponent<InputSelectComponentProps> {
    renderOption = (option) => {
        const { label, value } = option;

        return (
            <MenuItem value={ value } key={ value }>
                { label }
            </MenuItem>
        );
    };

    renderOptions() {
        const { options } = this.props;
        return options.map(this.renderOption);
    }

    render() {
        const {
            onChange,
            inputProps,
            value,
            defaultValue
        } = this.props;

        return (
            <MaterialSelect
              className="Select"
              displayEmpty
              inputProps={ inputProps }
              onChange={ onChange }
              value={ value }
              defaultValue={ defaultValue }
            >
                { this.renderOptions() }
            </MaterialSelect>
        );
    }
}

export default InputSelect;
