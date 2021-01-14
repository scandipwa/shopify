import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';

import { ProductType } from '../../api/Products.type';
import ProductProvider from '../../context/provider';
import ProductCardComponent from './ProductCard.component';

/** @namespace ShopifyProducts/Component/ProductCard/Container/ProductCardContainer */
export class ProductCardContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        product: ProductType.isRequired
    };

    render() {
        const { product } = this.props;

        return (
            <ProductProvider product={ product }>
                { super.render() }
            </ProductProvider>
        );
    }
}

export default withHOC(ProductCardContainer, ProductCardComponent);
