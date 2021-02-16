import { HigherOrderComponent, withHOC } from '@scandipwa/nextjs-framework/src/util/HOC';
import { ResponseDataType } from '@scandipwa/shopify-nextjs-api/src/api/types';
import Fallback from '@scandipwa/shopify-nextjs-api/src/component/Fallback';

import { CollectionType } from '../../api/Collections.type';
import CollectionPageComponent from './CollectionPage.component';
import { COLLECTION_COMPONENT_PAGE, COLLECTION_FALLBACK_PAGE } from './CollectionPage.config';

/** @namespace ShopifyNextjsCollections/Component/CollectionPage/Container/CollectionPageContainer */
export class CollectionPageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        responseData: ResponseDataType.isRequired,
        collection: CollectionType
    };

    static defaultProps = {
        collection: null
    };

    renderCollectionFallback = (errorCode) => {
        const Fallback = this._getComponentByKey(COLLECTION_FALLBACK_PAGE);
        return <Fallback statusCode={ errorCode } />;
    };

    renderCollectionComponent = (node) => {
        const Component = this._getComponentByKey(COLLECTION_COMPONENT_PAGE);
        return <Component collection={ node } />;
    };

    render() {
        const { collection, responseData: { errorCode } } = this.props;

        if (!collection || errorCode) {
            return this.renderCollectionFallback(errorCode);
        }

        return this.renderCollectionComponent(collection);
    }
}

export default withHOC(CollectionPageContainer, {
    [COLLECTION_COMPONENT_PAGE]: CollectionPageComponent,
    [COLLECTION_FALLBACK_PAGE]: Fallback
});
