import { createSortedMap } from '@scandipwa/shopify-api/src/util/SortedMap';
import { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import ProductContext from '../../context/product';
import { PRODUCT_CARD_IMAGE, PRODUCT_CARD_TITLE } from './ProductCard.config';

/** @namespace ShopifyProducts/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends PureComponent {
    static contextType = ProductContext;

    sortedRenderMap = createSortedMap({
        [PRODUCT_CARD_IMAGE]: this.renderImage.bind(this),
        [PRODUCT_CARD_TITLE]: this.renderTitle.bind(this)
    });

    renderImage() {
        const { product: { images: [{ src, alt }] = [] } } = this.context;

        if (!src) {
            return null;
        }

        // TODO: use Image component here
        return <img src={ src } alt={ alt } />;
    }

    renderTitle() {
        const { product: { title } } = this.context;

        if (!title) {
            return null;
        }

        // TODO: use Typography component here
        return <h2>{ title }</h2>;
    }

    renderContentPart = (render, i) => (
        <Fragment key={ i }>
            { render() }
        </Fragment>
    );

    renderContent() {
        return this.sortedRenderMap.map(this.renderContentPart);
    }

    renderLink() {
        const { product: { linkTo } } = this.context;

        return (
            <Link to={ linkTo } block="ProductCard">
                { this.renderContent() }
            </Link>
        );
    }

    render() {
        return this.renderLink();
    }
}

export default ProductCardComponent;
