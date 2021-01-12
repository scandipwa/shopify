import ApiClientContext from '@scandipwa/shopify-api/src/apiClient';
import { PureComponent } from 'react';

import { processCollections } from '../../api/Collections.processor';
import CollectionsQuery from '../../api/Collections.query';
import CollectionsPageComponent from './CollectionsPage.component';

/** @namespace ShopifyCollections/Component/CollectionsPage/Container/CollectionsPageContainer */
export class CollectionsPageContainer extends PureComponent {
    static contextType = ApiClientContext;

    state = {
        collections: {},
        isLoading: true,
        isError: false
    };

    __construct(props) {
        super.__construct(props);

        this.requestCollectionByHandle();
    }

    containerProps = () => {
        const {
            collections,
            isLoading,
            isError
        } = this.state;

        return {
            collections,
            isLoading,
            isError
        };
    };

    async requestCollectionByHandle() {
        const { postQuery } = this.context;

        // TODO: implement some-kind of pagination

        try {
            const { collections } = await postQuery(CollectionsQuery.getCollectionsQuery({
                amount: 16
            }));

            this.setState({
                collections: processCollections(collections),
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
            <CollectionsPageComponent
              { ...this.containerProps() }
            />
        );
    }
}

export default CollectionsPageContainer;
