import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';

import ProductHeroPriceComponent from './ProductHeroPrice.component';

/** @namespace ShopifyProduct-Prices/Component/ProductHeroPrice/Container/ProductHeroPriceContainer */
export class ProductHeroPriceContainer extends HigherOrderComponent {
    static contextType = ProductContext;

    containerProps = () => {
        const {
            selectedVariant: {
                price,
                compareAtPrice
            }
        } = this.context;

        return {
            price,
            compareAtPrice
        };
    };
}

export default withHOC(ProductHeroPriceContainer, ProductHeroPriceComponent);