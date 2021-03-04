import MaterialLink from '@material-ui/core/Link';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import React, { ElementType, ReactNode } from 'react';
import { LinkProps } from '@scandipwa/ui-api';
import { LocationDescriptor, LocationState } from 'history';

/** @namespace MaterialUi/Component/Link/Container */
export class LinkContainer extends PureComponent<LinkProps> {
    static defaultProps = {
        isPrimary: false
    };

    containerFunctions = {};

    containerProps = (): {
        color: 'textPrimary' | 'inherit',
        component: ElementType,
        children: ReactNode,
        to: LocationDescriptor<LocationState>
    } => {
        const {
            children,
            isPrimary,
            to
        } = this.props;

        return {
            component: Link,
            color: isPrimary ? 'textPrimary' : 'inherit',
            children,
            to
        };
    };

    render() {
        return (
            <MaterialLink
              className="Link"
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default LinkContainer;
