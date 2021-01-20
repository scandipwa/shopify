import { PureComponent } from 'react';

import ProductHero from '../ProductHero';

/** @namespace ShopifyProducts/Component/ProductPage/Component/ProductPageComponent */
export class ProductPageComponent extends PureComponent {
    renderMainSection() {
        return (
            <ProductHero key="hero" />
        );
    }

    renderSections() {
        return [
            this.renderMainSection()
        ];
    }

    render() {
        return (
            <div block="ProductPage">
                { this.renderSections() }
            </div>
        );
    }
}

export default ProductPageComponent;
