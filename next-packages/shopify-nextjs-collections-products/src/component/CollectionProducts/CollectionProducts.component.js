import PaginatedConnection from '@scandipwa/shopify-nextjs-api/src/component/PaginatedConnection';
import ProductCard from '@scandipwa/shopify-nextjs-products/src/component/ProductCard';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyCollectionsProducts/Component/CollectionProducts/Component/CollectionProductsComponent */
export class CollectionProductsComponent extends PureComponent {
    static propTypes = {
        collectionProductsResponse: PropTypes.number.isRequired
    };

    renderCard = (product, i) => (
        <ProductCard
          product={ product }
          key={ i }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCard);

    renderContent() {
        const { collectionProductsResponse } = this.props;

        return (
            <PaginatedConnection
              renderPage={ this.renderPage }
              paginatedResponse={ collectionProductsResponse }
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
