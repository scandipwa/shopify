import { Fragment, PureComponent } from 'react';

import ProductContext from '../../product';
import ProductMedia from '../ProductMedia';

/** @namespace ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent */
export class ProductHeroComponent extends PureComponent {
    static contextType = ProductContext;

    contentList = [
        this.renderTitle.bind(this),
        this.renderDescription.bind(this)
    ];

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

    renderContentPart = (render, i) => (
        <Fragment key={ i }>
            { render() }
        </Fragment>
    );

    renderContent() {
        return this.contentList.map(this.renderContentPart);
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
