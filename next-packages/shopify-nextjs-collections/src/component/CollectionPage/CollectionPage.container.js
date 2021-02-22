import { withFallback } from '@scandipwa/shopify-nextjs-api/src/util/withFallback';
import { PureComponent } from 'react';

import { CollectionType } from '../../api/Collections.type';
import CollectionPage from './CollectionPage.component';

/** @namespace ShopifyNextjsCollections/Component/CollectionPage/Container/CollectionPageContainer */
export class CollectionPageContainer extends PureComponent {
    static propTypes = {
        collection: CollectionType
    };

    static defaultProps = {
        collection: null
    };

    renderCollectionComponent = () => {
        const { collection } = this.props;
        return <CollectionPage collection={ collection } />;
    };

    render() {
        return this.renderCollectionComponent();
    }
}

export default withFallback(CollectionPageContainer);
