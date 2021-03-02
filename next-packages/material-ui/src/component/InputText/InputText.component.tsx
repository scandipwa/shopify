import MaterialInput from '@material-ui/core/Input';
import { InputTextProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

import { InputProps } from '../../util/Input';

export type InputTextComponentProps = InputProps & Pick<
    InputTextProps,
    'onChange' | 'placeholder' | 'type'
>;

/** @namespace Materialui/Component/InputText/Component/InputTextComponent */
export class InputTextComponent extends PureComponent<InputTextComponentProps> {
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

export default InputTextComponent;
