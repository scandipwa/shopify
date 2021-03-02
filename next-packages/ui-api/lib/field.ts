import { ReactElement } from 'react';

import {
    InputTextProps,
    InputCheckboxProps,
    InputRadioProps,
    InputSelectProps
} from './input';

type AllowedFieldChildren = ReactElement<InputTextProps | InputSelectProps>
    | Array<ReactElement<InputCheckboxProps | InputRadioProps>>

export interface FieldProps {
    children: AllowedFieldChildren,
    message?: string,
    label?: string,
    isError?: boolean
}