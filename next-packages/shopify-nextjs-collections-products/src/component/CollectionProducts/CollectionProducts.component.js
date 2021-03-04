import PaginatedConnection from '@scandipwa/shopify-nextjs-api/src/component/PaginatedConnection';
import { ProductsResponseType } from '@scandipwa/shopify-nextjs-products/src/api/Products.type';
import ProductCard from '@scandipwa/shopify-nextjs-products/src/component/ProductCard';
import { PureComponent } from 'react';

import { COLLECTION_PRODUCTS_AFTER_KEY, COLLECTION_PRODUCTS_BEFORE_KEY } from '../../plugin/CollectionsQuery.plugin';

/** @namespace ShopifyNextjsCollectionsProducts/Component/CollectionProducts/Component/CollectionProductsComponent */
export class CollectionProductsComponent extends PureComponent {
    static propTypes = {
        productsResponse: ProductsResponseType.isRequired
    };

    renderCard = (product, i) => (
        <ProductCard
          product={ product }
          key={ i }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCard);

    renderContent() {
        const { productsResponse } = this.props;

        return (
            <PaginatedConnection
              renderPage={ this.renderPage }
              paginatedResponse={ productsResponse }
              beforeParamName={ COLLECTION_PRODUCTS_BEFORE_KEY }
              afterParamName={ COLLECTION_PRODUCTS_AFTER_KEY }
            />
        );
    }

    render() {
        return (
            <div block="CollectionProducts">
                { this.renderContent() }
            </div>
        );
    }
}

export default CollectionProductsComponent;
