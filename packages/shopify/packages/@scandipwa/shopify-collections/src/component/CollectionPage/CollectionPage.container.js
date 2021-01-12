import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import ApiClientContext from '@scandipwa/shopify-api/src/apiClient';
import { PureComponent } from 'react';

import { processCollection } from '../../api/Collections.processor';
import CollectionsQuery from '../../api/Collections.query';
import CollectionPageComponent from './CollectionPage.component';

/** @namespace ShopifyCollections/Component/CollectionPage/Container/CollectionPageContainer */
export class CollectionPageContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    static contextType = ApiClientContext;

    __construct(props) {
        super.__construct(props);

        const collection = this.getCollectionFromHistoryState();

        this.state = {
            collection: collection || {},
            isLoading: !collection,
            isError: false
        };

        // even if the collection is in state, update the data
        this.getCollectionByHandler();
    }

    getCollectionFromHistoryState() {
        const { history } = this.props;
        return history?.location?.state?.collection;
    }

    containerProps = () => {
        const {
            collection,
            isLoading,
            isError
        } = this.state;

        return {
            collection,
            isLoading,
            isError
        };
    };

    async getCollectionByHandler() {
        const { match: { params: { handle } } } = this.props;
        const { postQuery } = this.context;

        // TODO: implement some-kind of pagination

        try {
            const { collectionByHandle: collection } = await postQuery(
                CollectionsQuery.getCollectionByHandleQuery({ handle })
            );

            this.setState({
                collection: processCollection(collection),
                isLoading: false,
                isError: false
            });
        } catch (e) {
            // TODO: use logger
            console.error(e);

            this.setState({
                isLoading: false,
                isError: true
            });
        }
    }

    render() {
        return (
            <CollectionPageComponent
              { ...this.containerProps() }
            />
        );
    }
}

export default CollectionPageContainer;
