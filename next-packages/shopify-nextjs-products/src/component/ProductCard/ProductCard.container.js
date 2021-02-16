import { HigherOrderComponent, withHOC } from '@scandipwa/nextjs-framework/src/util/HOC';

import { ProductType } from '../../api/Products.type';
import ProductProvider from '../../context/Products.provider';
import ProductCardComponent from './ProductCard.component';

/** @namespace ShopifyNextjsProducts/Component/ProductCard/Container/ProductCardContainer */
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
