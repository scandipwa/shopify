import { InputCheckboxProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

import { processInputProps } from '../../util/Input';
import InputCheckbox from './InputCheckbox.component';

/** @namespace Materialui/Component/InputCheckbox/Container/InputCheckboxContainer */
export class InputCheckboxContainer extends PureComponent<InputCheckboxProps> {
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
            defaultChecked,
            label,
            checked
        };
    };

    render() {
        return (
            <InputCheckbox
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default InputCheckboxContainer;
