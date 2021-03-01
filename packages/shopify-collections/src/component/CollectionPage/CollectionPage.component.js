import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import { CollectionType } from '../../api/Collections.type';

/**
 * Collection page component
 * @namespace ShopifyCollections/Component/CollectionPage/Component/CollectionPageComponent */
export class CollectionPageComponent extends PureComponent {
    static propTypes = {
        collection: CollectionType.isRequired
    };

    /**
     * A list of render methods used by collection page
     * @extPoint Inject render methods to be displayed on collection page
     * @extExample (member, instance) => {
     *     member.addItemToPosition(() => <MyComponent />);
     *     return member;
     * }
     */
    sortedRenderList = createSortedRenderList([
        this.renderImage.bind(this),
        this.renderTitle.bind(this),
        this.renderDescription.bind(this)
    ]);

    renderDescription() {
        const { collection: { descriptionHtml } } = this.props;

        if (!descriptionHtml) {
            return null;
        }

        // TODO: use HTML component here
        return descriptionHtml;
        // return <div dangerouslySetInnerHTML={ descriptionHtml } />;
    }

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

    renderContent() {
        return this.sortedRenderList.render();
    }

    render() {
        return (
            <div block="CollectionPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default CollectionPageComponent;
