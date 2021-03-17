import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ProductType } from '../api/Products.type';
import ProductContext from './Products.context';

/**
 * The product context
 * @namespace ShopifyProducts/Context/Products/Provider/ProductsProvider
 */
export class ProductsProvider extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        product: ProductType.isRequired
    };

    /**
     * A product context value
     * @extPoint Inject additional fields and methods into context
     * @extExample (args, callback) => ({
     *     ...callback(...args),
     *     myMethod: (v) => { this.myProperty = v; },
     *     myProperty: 'myOriginalValue'
     * })
     */
    getContextValue() {
        const { product } = this.props;
        return { product };
    }

    render() {
        const { children } = this.props;

        return (
            <ProductContext.Provider value={ this.getContextValue() }>
                { children }
            </ProductContext.Provider>
        );
    }
}

export default ProductsProvider;
