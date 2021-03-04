import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ButtonProps as ButtonProps } from '@scandipwa/ui-api';
import React, { PureComponent, ReactNode, ElementType, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';

/** @namespace MaterialUi/Component/Button/Container */
export class ButtonContainer extends PureComponent<ButtonProps> {
    static defaultProps = {
        onClick: () => {},
        isPrimary: true,
        isDisabled: false,
        type: 'contained',
        to: ''
    };

    containerFunctions = {};

    containerProps = () => {
        const {
            children,
            isPrimary,
            isDisabled,
            onClick,
            to
        } = this.props;

        const props: {
            children: ReactNode,
            variant: 'text' | 'outlined' | 'contained',
            to?: LocationDescriptor,
            component?: ElementType,
            onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
            color?: 'primary'
        } = {
            children,
            // Force contained buttons by default, allow outlined
            // https://material-ui.com/components/buttons/#contained-buttons
            // https://material-ui.com/components/buttons/#outlined-buttons
            variant: this.getType()
        };

        if (!isDisabled) {
            // Apply link / onClick behavior only on enabled buttons
            if (to) {
                props.to = to;
                props.component = Link;
            }

            props.onClick = onClick;
        }

        if (isPrimary) {
            props.color = 'primary';
        }

        return props;
    };

    getType() {
        const { type } = this.props;

        if (type === 'icon') {
            return undefined;
        }

        return type;
    }

    render() {
        const { type } = this.props;

        if (type === 'icon') {
            return (
                <IconButton
                  className={ `Button Button_${ type }` }
                  { ...this.containerProps() }
                  { ...this.containerFunctions }
                />
            );
        }

        return (
            <Button
              className={ `Button Button_${ type }` }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ButtonContainer;
