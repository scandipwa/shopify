import { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { CollectionType } from '../../api/Collections.type';

/** @namespace ShopifyCollections/Component/CollectionCard/Component/CollectionCardComponent */
export class CollectionCardComponent extends PureComponent {
    static propTypes = {
        collection: CollectionType.isRequired
    };

    renderMap = {
        image: this.renderMedia.bind(this),
        title: this.renderTitle.bind(this),
        description: this.renderDescription.bind(this)
    };

    renderMedia() {
        const { collection: { image: { transformedSrc, altText } } } = this.props;

        // TODO: use Image component here
        return <img src={ transformedSrc } alt={ altText } />;
    }

    renderTitle() {
        const { collection: { title } } = this.props;

        // TODO: use Typography component here
        return <h2>{ title }</h2>;
    }

    renderDescription() {
        const { collection: { description } } = this.props;

        // TODO: use Typography component here
        return <p>{ description }</p>;
    }

    renderContentParts = ([key, render]) => {
        const { collection } = this.props;

        if (!collection[key]) {
            return null;
        }

        return (
            <Fragment key={ key }>
                { render() }
            </Fragment>
        );
    };

    renderContent() {
        return Object.entries(this.renderMap).map(this.renderContentParts);
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
