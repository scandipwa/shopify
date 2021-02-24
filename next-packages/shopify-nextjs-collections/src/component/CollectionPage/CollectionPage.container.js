import NextPageContext from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import { withFallback } from '@scandipwa/shopify-nextjs-api/src/util/withFallback';
import { PureComponent } from 'react';

import CollectionPage from './CollectionPage.component';

/** @namespace ShopifyNextjsCollections/Component/CollectionPage/Container/CollectionPageContainer */
export class CollectionPageContainer extends PureComponent {
    static contextType = NextPageContext;

    renderCollectionComponent = () => {
        const { props: { collection } } = this.context;
        return <CollectionPage collection={ collection } />;
    };

    render() {
        return this.renderCollectionComponent();
    }
}

export default withFallback(CollectionPageContainer);
