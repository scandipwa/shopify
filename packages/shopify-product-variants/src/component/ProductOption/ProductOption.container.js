import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';
import PropTypes from 'prop-types';

import ProductOptionComponent from './ProductOption.component';

/**
 * Product Option Container. Used to connect with the Product Context and define functions.
 * @namespace ShopifyProductVariants/Component/ProductOption/Container/ProductOptionContainer */
export class ProductOptionContainer extends HigherOrderComponent {
    static contextType = ProductContext;

    static propTypes = {
        name: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(
            PropTypes.string
        ).isRequired
    };

    /**
     * Function which returns an object of functions.
     * @extPoint Add more logic to Product Option component
     * @extExample (member, instance) => ({
     *      ...member,
     *      onBlur: () => doSomething()
     * })
     */
    containerFunctions = {
        onChange: this.onChange.bind(this)
    };

    onChange({ target: { value } }) {
        const { selectOption } = this.context;
        const { name } = this.props;
        selectOption(name, value);
    }

    /**
     * Function which returns an object of props that are going to be passed down to the component.
     * @extPoint Add more props to Product Option component
     * @extExample (member, instance) => ({
     *      ...member,
     *      myField: 'myField'
     * })
     */
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
