import PaginatedConnection from '@scandipwa/shopify-api/src/component/PaginatedConnection';
import ProductCard from '@scandipwa/shopify-products/src/component/ProductCard';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { collectionProductsResponseProcessor } from '../../api/CollectionProducts.processor';
import CollectionProductsFallback from '../CollectionProductsFallback';

/**
 * Collection Products listing component
 * @namespace ShopifyCollectionsProducts/Component/CollectionProducts/Component/CollectionProductsComponent */
export class CollectionProductsComponent extends PureComponent {
    static propTypes = {
        getQuery: PropTypes.func.isRequired
    };

    renderCard = (product, i) => (
        <ProductCard
          product={ product }
          key={ i }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCard);

    renderPlaceholder = () => (
        <CollectionProductsFallback />
    );

    renderContent() {
        const { getQuery } = this.props;

        return (
            <PaginatedConnection
              renderPage={ this.renderPage }
              renderPlaceholder={ this.renderPlaceholder }
              queryGetter={ getQuery }
              responseProcessor={ collectionProductsResponseProcessor }
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
