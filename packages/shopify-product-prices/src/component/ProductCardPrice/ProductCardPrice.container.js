import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';

import ProductCardPriceComponent from './ProductCardPrice.component';

/**
 * Product Card Price Conatiner. Used to connect with the Product Context and pass calculated properties down to Product Card Price component.
 * @namespace ShopifyProductPrices/Component/ProductCardPrice/Container/ProductCardPriceContainer */
export class ProductCardPriceContainer extends HigherOrderComponent {
    static contextType = ProductContext;

    getIsStartingFrom() {
        const {
            product: {
                priceRange: {
                    maxVariantPrice: {
                        amount: maxA
                    },
                    minVariantPrice: {
                        amount: minA
                    }
                }
            }
        } = this.context;

        return maxA !== minA;
    }

    containerProps = () => {
        const {
            product: {
                priceRange: {
                    minVariantPrice
                }
            }
        } = this.context;

        return {
            price: minVariantPrice,
            isStartingFrom: this.getIsStartingFrom()
        };
    };
}

export default withHOC(ProductCardPriceContainer, ProductCardPriceComponent);
