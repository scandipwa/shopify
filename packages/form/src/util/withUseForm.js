/* eslint-disable react/prop-types */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

import { createElement } from 'react';
import {
    FormProvider,
    useForm,
    useFormContext
} from 'react-hook-form';

/** @namespace Form/Util/WithUseForm/withUseForm */
export const withUseForm = (Component) => {
    const withComponent = ({ formConfig, ...props }) => {
        const formProps = useForm(formConfig);

        return createElement(
            FormProvider,
            formProps,
            createElement(
                Component,
                {
                    useForm: formProps,
                    ...props
                }
            )
        );
    };

    withComponent.displayName = 'withUseForm';

    return withComponent;
};

/** @namespace Form/Util/WithUseForm/withUseFormContext */
export const withUseFormContext = (Component) => {
    const withComponent = (props) => {
        const formProps = useFormContext();
        return createElement(
            Component,
            {
                useForm: formProps,
                ...props
            }
        );
    };

    withComponent.displayName = 'withUseFormContext';

    return withComponent;
};