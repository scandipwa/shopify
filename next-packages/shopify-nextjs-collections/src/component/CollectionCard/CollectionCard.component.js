import { createSortedRenderList } from '@scandipwa/nextjs-framework/src/util/SortedMap';
import Link from 'next/link';
import { PureComponent } from 'react';

import { CollectionType } from '../../api/Collections.type';

/** @namespace ShopifyNextjsCollections/Component/CollectionCard/Component/CollectionCardComponent */
export class CollectionCardComponent extends PureComponent {
    static propTypes = {
        collection: CollectionType.isRequired
    };

    sortedRenderList = createSortedRenderList([
        this.renderImage.bind(this),
        this.renderTitle.bind(this),
        this.renderDescription.bind(this)
    ]);

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
        return this.sortedRenderList.render();
    }

    renderLink() {
        const { collection: { linkTo: { pathname } } } = this.props;

        return (
            <Link href={ pathname }>
                <a href={ pathname } block="CollectionCard">
                { this.renderContent() }
                </a>
            </Link>
        );
    }

    render() {
        return this.renderLink();
    }
}

export default CollectionCardComponent;
