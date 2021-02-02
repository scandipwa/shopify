import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyProductTags/Component/ProductTag/Component/ProductTagComponent */
export class ProductTagComponent extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired
    };

    renderTagLabel() {
        const { label } = this.props;

        return (
            <span>{ label }</span>
        );
    }

    render() {
        return (
            <div block="ProductTag">
                { this.renderTagLabel() }
            </div>
        );
    }
}

export default ProductTagComponent;
