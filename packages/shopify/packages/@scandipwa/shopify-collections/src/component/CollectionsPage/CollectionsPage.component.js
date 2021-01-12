import PaginatedConnection from '@scandipwa/shopify-api/src/component/PaginatedConnection';
import { PureComponent } from 'react';

import { processCollections } from '../../api/Collections.processor';
import CollectionsQuery from '../../api/Collections.query';
import CollectionCard from '../CollectionCard';
import CollectionsFallbackPage from '../CollectionsFallbackPage';

/** @namespace ShopifyCollections/Component/CollectionsPage/Component/CollectionsPageComponent */
export class CollectionsPageComponent extends PureComponent {
    renderCards = (collection, i) => (
        <CollectionCard
          key={ i }
          collection={ collection }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCards);

    renderPlaceholder = () => (
        <CollectionsFallbackPage />
    );

    render() {
        return (
            <PaginatedConnection
              renderPage={ this.renderPage }
              renderPlaceholder={ this.renderPlaceholder }
              queryGetter={ CollectionsQuery.getCollectionsQuery }
              queryProcessor={ processCollections }
            />
        );
    }
}

export default CollectionsPageComponent;
