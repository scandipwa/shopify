import { InputTextProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

import { processInputProps } from '../../util/Input';
import InputText from './InputText.component';

/** @namespace Materialui/Component/InputText/Container/InputTextContainer */
export class InputTextContainer extends PureComponent<InputTextProps> {
    static defaultProps = {
        onChange: () => {}
    };

    containerFunctions = {};

    containerProps = () => {
        const {
            type,
            onChange,
            placeholder,
            inputProps
        } = processInputProps(this.props);

        return {
            type,
            onChange,
            placeholder,
            inputProps
        };
    };

    render() {
        return (
            <InputText
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default InputTextContainer;
