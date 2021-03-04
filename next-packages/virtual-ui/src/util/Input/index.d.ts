import { InputBaseComponentProps } from '@material-ui/core/InputBase';

type PropsToMap = 'name' | 'autoComplete' | 'isDisabled' | 'isReadOnly' | 'onChange';

declare namespace VirtualModule.UI.Util.Input {
    type InputProps = {
        inputProps: InputBaseComponentProps,
        onChange: (value: unknown) => void
    }

    /** @namespace MaterialUi/Util/Props/processInputProps */
    const processInputProps: <T extends { [key: string]: any }> (props: T) => Pick<T, Exclude<keyof T, PropsToMap>> & InputProps
}

declare module '@virtual-module/ui/src/utl/Input' {
    export import InputProps = VirtualModule.UI.Util.Input.InputProps;
    export import processInputProps = VirtualModule.UI.Util.Input.processInputProps;
}

export import InputProps = VirtualModule.UI.Util.Input.InputProps;
export import processInputProps = VirtualModule.UI.Util.Input.processInputProps;
