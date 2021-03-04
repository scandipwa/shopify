import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { InputCheckboxProps } from '@scandipwa/ui-api';
import React from 'react';
import { PureComponent } from 'react';
import { InputProps } from '../../util/Input';

export type InputSelectComponentProps = InputProps & Pick<
    InputCheckboxProps,
    'onChange' | 'label' | 'value' | 'defaultValue' | 'checked' | 'defaultChecked'
>;

/** @namespace MaterialUi/Component/InputCheckbox/Component */
export class InputCheckbox extends PureComponent<InputSelectComponentProps> {
    render() {
        const {
            onChange,
            inputProps,
            label,
            checked,
            defaultChecked,
            value,
            defaultValue
        } = this.props;

        return (
            <FormControlLabel
              label={ label }
              control={
                <Checkbox
                  color="primary"
                  checked={ checked }
                  defaultChecked={ defaultChecked }
                  value={ value }
                  defaultValue={ defaultValue }
                  onChange={ onChange }
                  inputProps={ inputProps }
                />
              }
            />
        );
    }
}

export default InputCheckbox;
