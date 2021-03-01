import { PureComponent } from 'react';

import { ProductPriceType } from '../../api/ProductPrices.type';
import ProductPrice from '../Price';

/**
 * Product Hero Price component.
 * @namespace ShopifyProductPrices/Component/ProductHeroPrice/Component/ProductHeroPriceComponent */
export class ProductHeroPriceComponent extends PureComponent {
    static propTypes = {
        price: ProductPriceType.isRequired,
        compareAtPrice: ProductPriceType
    };

    static defaultProps = {
        compareAtPrice: {}
    };

    renderPrice() {
        const { price: { amount, currencyCode } = {} } = this.props;

        return (
            <ProductPrice
              amount={ amount }
              currency={ currencyCode }
            />
        );
    }

    renderCompareAtPrice() {
        const { compareAtPrice } = this.props;

        if (!compareAtPrice) {
            return null;
        }

        const { amount, currencyCode } = compareAtPrice;

        return (
            <del>
                <ProductPrice
                  amount={ amount }
                  currency={ currencyCode }
                />
            </del>
        );
    }

    render() {
        return (
            <div block="ProductHeroPrice">
                { this.renderPrice() }
                { this.renderCompareAtPrice() }
            </div>
        );
    }
}

export default ProductHeroPriceComponent;
