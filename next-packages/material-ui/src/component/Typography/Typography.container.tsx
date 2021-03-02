import { Variant as VariantProp } from '@material-ui/core/styles/createTypography';
import MaterialTypography from '@material-ui/core/Typography';
import { TypographyProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

/** @namespace Materialui/Component/Typography/Container/TypographyContainer */
export class TypographyContainer extends PureComponent<TypographyProps> {
    static defaultProps = {
        type: 'body'
    };

    containerFunctions = {};

    containerProps = () => {
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
            return type;
        }
    }

    render() {
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
