import PropTypes from 'prop-types';
import { PureComponent, Fragment } from 'react';

import { CollectionType } from '../../api/Collections.type';
import CollectionFallbackPage from '../CollectionFallbackPage';

/** @namespace ShopifyCollections/Component/CollectionPage/Component/CollectionPageComponent */
export class CollectionPageComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        collection: CollectionType.isRequired
    };

    renderMap = {
        image: this.renderMedia.bind(this),
        title: this.renderTitle.bind(this),
        descriptionHtml: this.renderDescription.bind(this)
    };

    renderDescription() {
        const { collection: { descriptionHtml } } = this.props;

        // TODO: use HTML component here
        return <div dangerouslySetInnerHTML={ descriptionHtml } />;
    }

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

    render() {
        const { isLoading } = this.props;

        if (isLoading) {
            return <CollectionFallbackPage />;
        }

        return (
            <div block="CollectionPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default CollectionPageComponent;
