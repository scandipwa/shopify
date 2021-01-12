import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';
import { PureComponent } from 'react';

import { processCollectionByHandleResponse } from '../../api/Collections.processor';
import CollectionsQuery from '../../api/Collections.query';
import CollectionFallbackPage from '../CollectionFallbackPage';
import CollectionPageComponent from './CollectionPage.component';

/** @namespace ShopifyCollections/Component/CollectionPage/Container/CollectionPageContainer */
export class CollectionPageContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    getCollectionFromHistoryState() {
        const { history } = this.props;
        return history?.location?.state?.collection;
    }

    getCollectionHandle() {
        const { match: { params: { handle } } } = this.props;
        return handle;
    }

    renderCollectionPlaceholder = () => (
        <CollectionFallbackPage />
    );

    renderCollectionComponent = (node) => (
        <CollectionPageComponent
          collection={ node }
        />
    );

    render() {
        return (
            <HandleConnection
              handle={ this.getCollectionHandle() }
              defaultNode={ this.getCollectionFromHistoryState() }
              renderNode={ this.renderCollectionComponent }
              renderNodePlaceholder={ this.renderCollectionPlaceholder }
              queryGetter={ CollectionsQuery.getCollectionByHandleField }
              responseProcessor={ processCollectionByHandleResponse }
            />
        );
    }
}

export default CollectionPageContainer;
