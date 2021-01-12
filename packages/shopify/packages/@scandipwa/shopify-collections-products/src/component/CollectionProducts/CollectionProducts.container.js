import { MatchType } from '@scandipwa/router/src/type/Router.type';
import { PureComponent } from 'react';
import { withRouter } from 'react-router';

import ProductsQuery from '../../api/CollectionProducts.query';
import CollectionProductsComponent from './CollectionProducts.component';

/** @namespace ShopifyCollection-Products/Component/CollectionProducts/Container/CollectionProductsContainer */
export class CollectionProductsContainer extends PureComponent {
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

        return ProductsQuery.getCollectionProducts({
            ...options,
            handle: collectionHandle
        });
    }

    render() {
        return (
            <CollectionProductsComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(CollectionProductsContainer);
