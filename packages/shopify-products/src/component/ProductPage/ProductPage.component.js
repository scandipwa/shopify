import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import ProductHero from '../ProductHero';

/**
 * Product page component
 * @namespace ShopifyProducts/Component/ProductPage/Component/ProductPageComponent
 */
export class ProductPageComponent extends PureComponent {
    sortedRenderMap = createSortedRenderMap({
        productPageMainSection: this.renderMainSection.bind(this)
    });

    renderMainSection() {
        return (
            <ProductHero key="hero" />
        );
    }

    renderContent() {
        return this.sortedRenderMap.render();
    }

    render() {
        return (
            <div block="ProductPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default ProductPageComponent;
