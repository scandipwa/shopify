/* eslint-disable max-len */
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

type PropsToMap = 'name' | 'autoComplete' | 'isDisabled' | 'isReadOnly' | 'onChange';

export type InputProps = {
    inputProps: InputBaseComponentProps,
    onChange: (value: any) => void
}

/** @namespace Materialui/Util/Input/Index/processInputProps */
export const processInputProps = <T extends { [key: string]: any }> (props: T): Pick<T, Exclude<keyof T, PropsToMap>> & InputProps => {
    const {
        name,
        autoComplete,
        isDisabled,
        isReadOnly,
        onChange,
        ...restProps
    } = props;

    return {
        inputProps: {
            name,
            autoComplete,
            disabled: isDisabled,
            readOnly: isReadOnly
        },
        onChange: (event) => onChange(event.target.value),
        ...restProps
    };
};
