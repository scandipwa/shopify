import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';
import PropTypes from 'prop-types';

import ProductOptionComponent from './ProductOption.component';

/** @namespace ShopifyProduct-Variants/Component/ProductOption/Container/ProductOptionContainer */
export class ProductOptionContainer extends HigherOrderComponent {
    static contextType = ProductContext;

    static propTypes = {
        name: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(
            PropTypes.string
        ).isRequired
    };

    containerFunctions = {
        onChange: this.onChange.bind(this)
    };

    onChange({ target: { value } }) {
        const { selectOption } = this.context;
        const { name } = this.props;
        selectOption(name, value);
    }

    containerProps = () => {
        const { name, values } = this.props;
        const { selectedOptions: { [name]: value } } = this.context;

        return {
            name,
            values,
            currentValue: value
        };
    };
}

export default withHOC(ProductOptionContainer, ProductOptionComponent);
