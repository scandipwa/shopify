import PaginatedConnection from '@scandipwa/shopify-api/src/component/PaginatedConnection';
import ProductCard from '@scandipwa/shopify-products/src/component/ProductCard';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { collectionProductsResponseProcessor } from '../../api/CollectionProducts.processor';
import CollectionProductsFallback from '../CollectionProductsFallback';

/** @namespace ShopifyCollection-Products/Component/CollectionProducts/Component/CollectionProductsComponent */
export class CollectionProductsComponent extends PureComponent {
    static propTypes = {
        isCollectionLoading: PropTypes.bool.isRequired,
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

    render() {
        const {
            isCollectionLoading,
            getQuery
        } = this.props;

        if (isCollectionLoading) {
            return this.renderPlaceholder();
        }

        return (
            <PaginatedConnection
              renderPage={ this.renderPage }
              renderPlaceholder={ this.renderPlaceholder }
              queryGetter={ getQuery }
              responseProcessor={ collectionProductsResponseProcessor }
            />
        );
    }
}

export default CollectionProductsComponent;
