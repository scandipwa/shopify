import { InputRadioProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

import { processInputProps } from '../../util/Input';
import InputRadio from './InputRadio.component';

/** @namespace Materialui/Component/InputRadio/Container/InputRadioContainer */
export class InputRadioContainer extends PureComponent<InputRadioProps> {
    static defaultProps = {
        onChange: () => {}
    };

    containerFunctions = {};

    containerProps = () => {
        const {
            onChange,
            inputProps,
            defaultValue,
            value,
            defaultChecked,
            label,
            checked
        } = processInputProps(this.props);

        return {
            onChange,
            inputProps,
            defaultValue,
            value,
            label,
            defaultChecked,
            checked
        };
    };

    render() {
        return (
            <InputRadio
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default InputRadioContainer;
