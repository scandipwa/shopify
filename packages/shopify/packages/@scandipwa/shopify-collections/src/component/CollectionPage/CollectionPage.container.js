import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';

import { processCollectionByHandleResponse } from '../../api/Collections.processor';
import getCollectionsQueryOfType, { SINGLE_COLLECTION } from '../../api/Collections.query';
import CollectionFallbackPage from '../CollectionFallbackPage';
import CollectionPageComponent from './CollectionPage.component';
import { COLLECTION_COMPONENT_PAGE, COLLECTION_FALLBACK_PAGE } from './CollectionPage.config';

/** @namespace ShopifyCollections/Component/CollectionPage/Container/CollectionPageContainer */
export class CollectionPageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
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

    renderCollectionPlaceholder = () => {
        const Fallback = this._getComponentByKey(COLLECTION_FALLBACK_PAGE);
        return <Fallback />;
    };

    renderCollectionComponent = (node) => {
        const Component = this._getComponentByKey(COLLECTION_COMPONENT_PAGE);
        return <Component collection={ node } />;
    };

    render() {
        return (
            <HandleConnection
              handle={ this.getCollectionHandle() }
              defaultNode={ this.getCollectionFromHistoryState() }
              renderNode={ this.renderCollectionComponent }
              renderNodePlaceholder={ this.renderCollectionPlaceholder }
              queryGetter={ getCollectionsQueryOfType(SINGLE_COLLECTION) }
              responseProcessor={ processCollectionByHandleResponse }
            />
        );
    }
}

export default withHOC(CollectionPageContainer, {
    [COLLECTION_COMPONENT_PAGE]: CollectionPageComponent,
    [COLLECTION_FALLBACK_PAGE]: CollectionFallbackPage
});
