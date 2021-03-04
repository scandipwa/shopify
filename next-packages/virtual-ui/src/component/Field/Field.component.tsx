import { PureComponent } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { FieldProps } from '@scandipwa/ui-api';

export type AllowedChildrenType = 'radio' | 'radio-group' | 'checkbox' | 'select' | 'text' | 'unknown';

export type FieldComponentProps = {
    type: AllowedChildrenType
} & FieldProps;

/** @namespace MaterialUi/Component/Field/Component */
export class FieldContainer extends PureComponent<FieldComponentProps> {
    renderInput() {
        const { children, type } = this.props;

        if (type === 'checkbox') {
            return (
                <FormGroup>
                    { children }
                </FormGroup>
            )
        }

        if (type === 'radio') {
            return (
                <RadioGroup>
                    { children }
                </RadioGroup>
            )
        }

        return children;
    }

    renderMessage() {
        const { message } = this.props;

        if (!message) {
            return null;
        }

        return (
            <FormHelperText>
                { message }
            </FormHelperText>
        )
    }

    renderLabel() {
        const { label, type } = this.props;

        if (!label) {
            return null;
        }

        if (type === 'checkbox' || type === 'radio') {
            return (
                <FormLabel>
                    { label }
                </FormLabel>
            )
        }

        // TODO: find some way to generate htmlFor

        return (
            <InputLabel shrink={ type === 'select' ? true : undefined }>
                { label }
            </InputLabel>
        );
    }

    render() {
        const { isError } = this.props;
        
        return (
            <FormControl
              className="Field"
              error={ isError }
            >
                { this.renderLabel() }
                { this.renderInput() }
                { this.renderMessage() }
            </FormControl>
        );
    }
}

export default FieldContainer;
