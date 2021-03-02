interface Input {
    name: string,
    // Require one of these two values
    value?: string | number,
    defaultValue?: string | number,
    // Hint for form autofill feature
    autoComplete?: string,
    // Whether the form control is disabled
    isDisabled?: boolean,
    // Whether the value is not editable
    isReadOnly?: boolean,
    onChange?: (value: any) => void
}

export interface InputTextProps extends Input {
    type: 'text' | 'email' | 'password' | 'tel' | 'number',
    placeholder?: string,
    min?: number,
    max?: number
}

export interface TextAreaInputProps extends Input {
    placeholder?: string,
    cols?: number
}

export interface SelectOption {
    value: string,
    label: string
}

export interface InputSelectProps extends Input {
    placeholder?: string,
    options: Array<SelectOption>
}

export interface InputCheckboxProps extends Input {
    label?: string,
    checked?: boolean,
    defaultChecked?: boolean
}

export interface InputRadioProps extends Input {
    label?: string,
    checked?: boolean,
    defaultChecked?: boolean
}

