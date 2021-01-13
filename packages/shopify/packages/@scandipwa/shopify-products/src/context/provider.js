/* eslint-disable react/no-did-update-set-state */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ProductType } from '../api/Products.type';
import ProductContext from './product';

/** @namespace ShopifyProducts/Context/Provider/ProductProvider */
export class ProductProvider extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        product: ProductType.isRequired
    };

    componentDidUpdate() {
        const { product } = this.props;
        const { product: stateProduct } = this.state;

        if (product.id !== stateProduct.id) {
            this.setState({ product });
        }
    }

    __construct(props) {
        super.__construct(props);

        const { product = {} } = props;
        this.state = { product };
    }

    getContextValue() {
        const { product } = this.state;
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

export default ProductProvider;
