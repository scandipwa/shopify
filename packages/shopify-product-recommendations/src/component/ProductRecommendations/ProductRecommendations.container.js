import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';
import ProductsContext from '@scandipwa/shopify-products/src/context/Products.context';

import { processProductRecommendationsResponse } from '../../api/ProductRecommendations.processor';
import ProductRecommendationsQuery from '../../api/ProductRecommendations.query';
import ProductRecommendationsFallback from '../ProductRecommendationsFallback';
import ProductRecommendations from './ProductRecommendations.component';
import { PRODUCT_RECOMMENDATIONS_COMPONENT, PRODUCT_RECOMMENDATIONS_FALLBACK } from './ProductRecommendations.config';

/** @namespace ShopifyProductRecommendations/Component/ProductRecommendations/Container/ProductRecommendationsContainer */
export class ProductRecommendationsContainer extends HigherOrderComponent {
    static contextType = ProductsContext;

    getProductId() {
        const { product: { id } } = this.context;

        return id;
    }

    renderProductRecommendationsPlaceholder = () => {
        const Fallback = this._getComponentByKey(PRODUCT_RECOMMENDATIONS_FALLBACK);
        return <Fallback />;
    };

    renderProductRecommendationsComponent = (products) => {
        const Component = this._getComponentByKey(PRODUCT_RECOMMENDATIONS_COMPONENT);
        return <Component products={ products } />;
    };

    render() {
        return (
            <HandleConnection
              queryArgs={ { productId: this.getProductId() } }
              renderNode={ this.renderProductRecommendationsComponent }
              renderNodePlaceholder={ this.renderProductRecommendationsPlaceholder }
              queryGetter={ ProductRecommendationsQuery.getRecommendedProductsField }
              responseProcessor={ processProductRecommendationsResponse }
            />
        );
    }
}

export default withHOC(ProductRecommendationsContainer, {
    [PRODUCT_RECOMMENDATIONS_COMPONENT]: ProductRecommendations,
    [PRODUCT_RECOMMENDATIONS_FALLBACK]: ProductRecommendationsFallback
});
