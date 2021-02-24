import NextPageContext from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import PaginatedConnection from '@scandipwa/shopify-nextjs-api/src/component/PaginatedConnection';
import { PureComponent } from 'react';

import CollectionCard from '../CollectionCard';

/** @namespace ShopifyNextjsCollections/Component/CollectionsPage/Component/CollectionsPageComponent */
export class CollectionsPageComponent extends PureComponent {
    static contextType = NextPageContext;

    renderCards = (collection, i) => (
        <CollectionCard
          key={ i }
          collection={ collection }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCards);

    renderContent() {
        const { props: { collectionsResponse } } = this.context;

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
