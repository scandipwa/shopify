import PaginatedConnection from '@scandipwa/shopify-nextjs-api/src/component/PaginatedConnection';
import { PureComponent } from 'react';

import { CollectionsResponseType } from '../../api/Collections.type';
import CollectionCard from '../CollectionCard';

/** @namespace ShopifyNextjsCollections/Component/CollectionsPage/Component/CollectionsPageComponent */
export class CollectionsPageComponent extends PureComponent {
    static propTypes = {
        collectionsResponse: CollectionsResponseType
    };

    static defaultProps = {
        collectionsResponse: null
    };

    renderCards = (collection, i) => (
        <CollectionCard
          key={ i }
          collection={ collection }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCards);

    renderContent() {
        const { collectionsResponse } = this.props;

        return (
            <PaginatedConnection
              paginatedResponse={ collectionsResponse }
              renderPage={ this.renderPage }
            />
        );
    }

    render() {
        return (
            <div block="CollectionsPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default CollectionsPageComponent;
