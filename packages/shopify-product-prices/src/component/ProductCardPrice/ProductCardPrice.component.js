import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ProductPriceType } from '../../api/ProductPrices.type';
import ProductPrice from '../Price';

/**
 * Product Card Price component.
 * @namespace ShopifyProductPrices/Component/ProductCardPrice/Component/ProductCardPriceComponent */
export class ProductCardPriceComponent extends PureComponent {
    static propTypes = {
        isStartingFrom: PropTypes.bool.isRequired,
        price: ProductPriceType.isRequired
    };

    renderPrice() {
        const { price: { amount, currencyCode } } = this.props;

        return (
            <ProductPrice
              amount={ amount }
              currency={ currencyCode }
            />
        );
    }

    renderStartingFrom() {
        const { isStartingFrom } = this.props;

        if (!isStartingFrom) {
            return null;
        }

        return (
            <span>Starting from</span>
        );
    }

    render() {
        return (
            <div block="ProductCardPrice">
                { this.renderStartingFrom() }
                { this.renderPrice() }
            </div>
        );
    }
}

export default ProductCardPriceComponent;
