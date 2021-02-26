import PaginatedConnection from '@scandipwa/shopify-api/src/component/PaginatedConnection';
import ProductCard from '@scandipwa/shopify-products/src/component/ProductCard';
import { PureComponent } from 'react';

import { processProductsResponse } from '../../api/Products.processor';
import getProductsQueryOfType, { PAGINATED_PRODUCTS } from '../../api/Products.query';
import ProductsFallbackPage from '../ProductsFallbackPage';

/**
 * Product listing page component
 * @namespace ShopifyProducts/Component/ProductsPage/Component/ProductsPageComponent
 */
export class ProductsPageComponent extends PureComponent {
    renderCard = (product, i) => (
        <ProductCard
          product={ product }
          key={ i }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCard);

    renderPlaceholder = () => (
        <ProductsFallbackPage />
    );

    render() {
        return (
            <PaginatedConnection
              renderPage={ this.renderPage }
              renderPlaceholder={ this.renderPlaceholder }
              queryGetter={ getProductsQueryOfType(PAGINATED_PRODUCTS) }
              responseProcessor={ processProductsResponse }
            />
        );
    }
}

export default ProductsPageComponent;
