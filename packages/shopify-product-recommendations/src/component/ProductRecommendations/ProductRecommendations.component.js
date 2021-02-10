import ProductCard from '@scandipwa/shopify-products/src/component/ProductCard';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ProductRecommendationType } from '../../api/ProductRecommendations.type';

/** @namespace ShopifyProductRecommendations/Component/ProductRecommendations/Component/ProductRecommendationsComponent */
export class ProductRecommendationsComponent extends PureComponent {
    static propTypes = {
        products: PropTypes.arrayOf(ProductRecommendationType).isRequired
    };

    renderProductRecommendation = (product) => {
        const { id } = product;
        return (
            <ProductCard
              product={ product }
              key={ id }
            />
        );
    };

    renderRecommendations = () => {
        const { products } = this.props;

        return products.map(this.renderProductRecommendation);
    };

    render() {
        return (
            <div block="ProductRecommendations">
                { this.renderRecommendations() }
            </div>
        );
    }
}

export default ProductRecommendationsComponent;
