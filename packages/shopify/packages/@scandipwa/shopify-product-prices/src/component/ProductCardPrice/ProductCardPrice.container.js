import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';
import ProductContext from '@scandipwa/shopify-products/src/context/product';

import ProductCardPriceComponent from './ProductCardPrice.component';

/** @namespace ShopifyProduct-Prices/Component/ProductCardPrice/Container/ProductCardPriceContainer */
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
