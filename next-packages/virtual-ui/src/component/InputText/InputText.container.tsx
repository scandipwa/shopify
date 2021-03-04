import { PureComponent } from 'react';
import { InputTextProps } from '@scandipwa/ui-api';

import { processInputProps } from '../../util/Input';
import InputText from './InputText.component';
import React from 'react';

/** @namespace MaterialUi/Component/InputText/Container */
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
