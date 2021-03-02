import MaterialLink from '@material-ui/core/Link';
import { LinkProps } from '@scandipwa/ui-api';
import { PureComponent, ReactNode } from 'react';

/** @namespace Materialui/Component/Link/Container/LinkContainer */
export class LinkContainer extends PureComponent<LinkProps> {
    static defaultProps = {
        isPrimary: false
    };

    containerFunctions = {};

    containerProps = (): {
        color: 'textPrimary' | 'inherit',
        children: ReactNode
    } => {
        const {
            children,
            isPrimary,
            to
        } = this.props;

        return {
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
