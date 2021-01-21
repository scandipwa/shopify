/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import {
    FormProvider,
    useForm
} from 'react-hook-form';

/** @namespace Form/Util/WithUseForm/withUseForm */
export const withUseForm = (Component) => (props) => {
    const form = useForm(Component.useForm);

    return (
        <FormProvider { ...form }>
            <Component { ...props } { ...form } />
        </FormProvider>
    );
};
