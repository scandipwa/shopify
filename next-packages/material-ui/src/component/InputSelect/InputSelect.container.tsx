import { InputSelectProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

import { processInputProps } from '../../util/Input';
import InputSelect from './InputSelect.component';

/** @namespace Materialui/Component/InputSelect/Container/InputSelectContainer */
export class InputSelectContainer extends PureComponent<InputSelectProps> {
    static defaultProps = {
        onChange: () => {}
    };

    containerFunctions = {};

    containerProps = () => {
        const {
            onChange,
            inputProps,
            value
        } = processInputProps(this.props);

        return {
            onChange,
            defaultValue: this.getDefaultValue(),
            value,
            options: this.getOptions(),
            inputProps
        };
    };

    getDefaultValue() {
        const {
            placeholder,
            defaultValue,
            value,
            options
        } = this.props;

        if (value) {
            // if there is value => ignore
            return undefined;
        }

        if (defaultValue) {
            // if there is defaultValue => use it
            return defaultValue;
        }

        if (placeholder) {
            // if placeholder, use empty value
            return '';
        }

        // Otherwise, retrieve from first option given
        const { value: firstOptionValue = '' } = options[0] || {};

        return firstOptionValue;
    }

    getOptions() {
        const { placeholder, options } = this.props;

        if (!placeholder) {
            return options;
        }

        return [
            {
                value: '',
                label: placeholder
            },
            ...options
        ];
    }

    render() {
        return (
            <InputSelect
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default InputSelectContainer;
