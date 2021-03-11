import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { CollectionType } from '../../api/Collections.type';

/**
 * The collection card (preview) component
 * @namespace ShopifyCollections/Component/CollectionCard/Component/CollectionCardComponent */
export class CollectionCardComponent extends PureComponent {
    static propTypes = {
        collection: CollectionType.isRequired
    };

    /**
     * A list of render methods used by collection card
     * @extPoint Inject render methods to be displayed on collection card
     * @extExample (member, instance) => {
     *     member.addItem(() => <MyCartSection />, 'someKey');
     *     return member;
     * }
     */
    sortedRenderMap = createSortedRenderMap({
        collectionCardImage: this.renderImage.bind(this),
        collectionCardTitle: this.renderTitle.bind(this),
        collectionCardDescription: this.renderDescription.bind(this)
    });

    renderImage() {
        const { collection: { image } } = this.props;

        if (!image) {
            return null;
        }

        const { src, alt } = image;

        // TODO: use Image component here
        return <img src={ src } alt={ alt } />;
    }

    renderTitle() {
        const { collection: { title } } = this.props;

        if (!title) {
            return null;
        }

        // TODO: use Typography component here
        return <h2>{ title }</h2>;
    }

    renderDescription() {
        const { collection: { description } } = this.props;

        if (!description) {
            return null;
        }

        // TODO: use Typography component here
        return <p>{ description }</p>;
    }

    renderContent() {
        return this.sortedRenderMap.render();
    }

    renderLink() {
        const { collection: { linkTo } } = this.props;

        return (
            <Link to={ linkTo } block="CollectionCard">
                { this.renderContent() }
            </Link>
        );
    }

    render() {
        return this.renderLink();
    }
}

export default CollectionCardComponent;
