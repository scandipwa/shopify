import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CollectionsResponseType } from '../../api/Collections.type';
import CollectionCard from '../CollectionCard';
import CollectionsFallbackPage from '../CollectionsFallbackPage';

/** @namespace ShopifyCollections/Component/CollectionsPage/Component/CollectionsPageComponent */
export class CollectionsPageComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        collections: CollectionsResponseType.isRequired
    };

    renderCollection({ cursor, node }) {
        return (
            <CollectionCard
              key={ cursor }
              collection={ node }
            />
        );
    }

    renderCollections() {
        const { collections: { edges = [] } } = this.props;
        return edges.map(this.renderCollection);
    }

    render() {
        const { isLoading } = this.props;

        if (isLoading) {
            // the same placeholder which shows while app is loading
            return <CollectionsFallbackPage />;
        }

        return (
            <div block="CollectionsPage">
                { this.renderCollections() }
            </div>
        );
    }
}

export default CollectionsPageComponent;
