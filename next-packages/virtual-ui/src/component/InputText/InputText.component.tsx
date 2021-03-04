import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import MaterialInput from '@material-ui/core/Input';
import React, { PureComponent } from 'react';
import { InputTextProps } from '@scandipwa/ui-api';
import { InputProps } from '../../util/Input';

export type InputTextComponentProps = InputProps & Pick<
    InputTextProps,
    'onChange' | 'placeholder' | 'type'
>;

/** @namespace MaterialUi/Component/InputText/Component */
export class InputText extends PureComponent<InputTextComponentProps> {
    render() {
        const {
            type,
            onChange,
            inputProps,
            placeholder
        } = this.props;

        return (
            <MaterialInput
              type={ type }
              onChange={ onChange }
              placeholder={ placeholder }
              inputProps={ inputProps }
            />
        );
    }
}

export default InputText;
