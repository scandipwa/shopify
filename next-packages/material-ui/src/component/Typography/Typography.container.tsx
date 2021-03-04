import { Variant as VariantProp } from '@material-ui/core/styles/createTypography';
import MaterialTypography from '@material-ui/core/Typography';
import {
    TypographyProps,
    TypographyState
} from '@virtual-module/ui/src/component/Typography';
import { PureComponent } from 'react';

declare module '@virtual-module/ui/src/component/Typography' {
    interface TypographyProps {
        type: string
    }
}

/** @namespace Materialui/Component/Typography/Container/TypographyContainer */
export class TypographyContainer extends PureComponent<TypographyProps, TypographyState> {
    static defaultProps = {
        type: 'body'
    };

    containerFunctions = {};

    containerProps = (): Omit<TypographyProps, 'type'> & { variant: VariantProp } => {
        const {
            children,
            component
        } = this.props;

        return {
            component,
            variant: this.getVariant(),
            children
        };
    };

    getVariant(): VariantProp {
        const { type } = this.props;

        switch (type) {
        case 'body':
            return 'body1';
        default:
            return type as VariantProp;
        }
    }

    render(): JSX.Element {
        const { type } = this.props;

        return (
            <MaterialTypography
              className={ `Typography Typography_${ type }` }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default TypographyContainer;
