import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import ProductContext from '../../context/Products.context';

/** @namespace ShopifyProducts/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends PureComponent {
    static contextType = ProductContext;

    sortedRenderList = createSortedRenderList([
        this.renderImage.bind(this),
        this.renderTitle.bind(this)
    ]);

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

    renderContent() {
        return this.sortedRenderList.render();
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
