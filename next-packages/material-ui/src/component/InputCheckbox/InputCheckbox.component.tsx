import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InputCheckboxProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

import { InputProps } from '../../util/Input';

export type InputSelectComponentProps = InputProps & Pick<
    InputCheckboxProps,
    'onChange' | 'label' | 'value' | 'defaultValue' | 'checked' | 'defaultChecked'
>;

/** @namespace Materialui/Component/InputCheckbox/Component/InputCheckboxComponent */
export class InputCheckboxComponent extends PureComponent<InputSelectComponentProps> {
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
              control={ (
                <Checkbox
                  color="primary"
                  checked={ checked }
                  defaultChecked={ defaultChecked }
                  value={ value }
                  defaultValue={ defaultValue }
                  onChange={ onChange }
                  inputProps={ inputProps }
                />
              ) }
            />
        );
    }
}

export default InputCheckboxComponent;
