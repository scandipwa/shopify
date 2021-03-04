import { createSortedRenderMap } from '@scandipwa/nextjs-framework/src/util/SortedMap';
import Link from 'next/link';
import { PureComponent } from 'react';

import ProductContext from '../../context/Products.context';

/** @namespace ShopifyNextjsProducts/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends PureComponent {
    static contextType = ProductContext;

    sortedRenderList = createSortedRenderMap({
        productCardImage: this.renderImage.bind(this),
        productCardTitle: this.renderTitle.bind(this)
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

    renderContent() {
        return this.sortedRenderList.render();
    }

    renderLink() {
        const { product: { linkTo: { pathname } } } = this.context;

        return (
            <Link href={ pathname }>
                <a href={ pathname } className="CollectionCard">
                    { this.renderContent() }
                </a>
            </Link>
        );
    }

    render() {
        return this.renderLink();
    }
}

export default ProductCardComponent;
