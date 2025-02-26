import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';

import { processCollectionByHandleResponse } from '../../api/Collections.processor';
import getCollectionsQueryOfType, { SINGLE_COLLECTION } from '../../api/Collections.query';
import CollectionFallbackPage from '../CollectionFallbackPage';
import CollectionPageComponent from './CollectionPage.component';
import { COLLECTION_COMPONENT_PAGE, COLLECTION_FALLBACK_PAGE } from './CollectionPage.config';

/**
 * Collection page container. Used to prepare the data and request the collection
 * @namespace ShopifyCollections/Component/CollectionPage/Container/CollectionPageContainer */
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

    /**
     * Getter for product query arguments
     * @extPoint Inject additional arguments into collection query
     * @extExample (args, callback) => ({
     *     ...callback(...args),
     *     myArgument: 'myValue'
     * })
     */
    getQueryArgs() {
        const { match: { params: { handle } } } = this.props;
        return {
            handle
        };
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
              queryArgs={ this.getQueryArgs() }
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
