import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import ProductContext from '../../context/Products.context';
import ProductMedia from '../ProductMedia';

/** @namespace ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent */
export class ProductHeroComponent extends PureComponent {
    static contextType = ProductContext;

    sortedRenderList = createSortedRenderList([
        this.renderTitle.bind(this),
        this.renderDescription.bind(this)
    ]);

    renderMedia() {
        return (
            <ProductMedia />
        );
    }

    renderTitle() {
        const { product: { title } } = this.context;

        if (!title) {
            return null;
        }

        // TODO: use Typography component here
        return (
            <h2>{ title }</h2>
        );
    }

    renderDescription() {
        const { product: { descriptionHtml } } = this.context;

        if (!descriptionHtml) {
            return null;
        }

        // TODO: use Typography component here
        return descriptionHtml;
    }

    renderContent() {
        return this.sortedRenderList.render();
    }

    render() {
        return (
            <section
              block="ProductHero"
            >
                <div block="ProductHero" elem="Media">
                    { this.renderMedia() }
                </div>
                <div block="ProductHero" elem="Content">
                    { this.renderContent() }
                </div>
            </section>
        );
    }
}

export default ProductHeroComponent;
