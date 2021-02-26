import { PureComponent } from 'react';

import ProductHero from '../ProductHero';

/**
 * Product page component
 * @namespace ShopifyProducts/Component/ProductPage/Component/ProductPageComponent
 */
export class ProductPageComponent extends PureComponent {
    renderMainSection() {
        return (
            <ProductHero key="hero" />
        );
    }

    /**
     * A list of sections (rendered) used by product page
     * @extPoint Inject renders to be displayed in product page
     * @extExample (args, callback) => ([
     *     ...callback(...args),
     *     <MySection />
     * ])
     */
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
