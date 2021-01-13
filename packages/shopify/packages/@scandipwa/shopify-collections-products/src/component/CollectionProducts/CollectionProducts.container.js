import { MatchType } from '@scandipwa/router/src/type/Router.type';
import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';
import { withRouter } from 'react-router';

import getCollectionProductsQueryOfType, { SINGLE_PRODUCT_COLLECTION } from '../../api/CollectionProducts.query';
import CollectionProductsComponent from './CollectionProducts.component';

/** @namespace ShopifyCollection-Products/Component/CollectionProducts/Container/CollectionProductsContainer */
export class CollectionProductsContainer extends HigherOrderComponent {
    static propTypes = {
        match: MatchType.isRequired
    };

    containerFunctions = {
        getQuery: this.getQuery.bind(this)
    };

    containerProps = () => {
        const collectionHandle = this.getCollectionHandle();

        return {
            isCollectionLoading: !collectionHandle
        };
    };

    getCollectionHandle() {
        const { match: { params: { handle } } } = this.props;
        return handle;
    }

    getQuery(options) {
        const collectionHandle = this.getCollectionHandle();

        return getCollectionProductsQueryOfType(SINGLE_PRODUCT_COLLECTION)({
            ...options,
            handle: collectionHandle
        });
    }
}

export default withHOC(withRouter(CollectionProductsContainer), CollectionProductsComponent);
