import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { InputRadioProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

import { InputProps } from '../../util/Input';

export type InputSelectComponentProps = InputProps & Pick<
    InputRadioProps,
    'onChange' | 'label' | 'value' | 'defaultValue' | 'checked' | 'defaultChecked'
>;

/** @namespace Materialui/Component/InputRadio/Component/InputRadioComponent */
export class InputRadioComponent extends PureComponent<InputSelectComponentProps> {
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
              value={ value || defaultValue }
              control={ (
                <Radio
                  color="primary"
                  checked={ checked }
                  defaultChecked={ defaultChecked }
                  onChange={ onChange }
                  inputProps={ inputProps }
                />
              ) }
            />
        );
    }
}

export default InputRadioComponent;
