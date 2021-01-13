import PaginatedConnection from '@scandipwa/shopify-api/src/component/PaginatedConnection';
import { PureComponent } from 'react';

import { collectionsResponseProcessor } from '../../api/Collections.processor';
import getCollectionsQueryOfType, { PAGINATED_COLLECTIONS } from '../../api/Collections.query';
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
              queryGetter={ getCollectionsQueryOfType(PAGINATED_COLLECTIONS) }
              responseProcessor={ collectionsResponseProcessor }
            />
        );
    }
}

export default CollectionsPageComponent;
