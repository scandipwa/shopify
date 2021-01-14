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

export default ProductProvider;
