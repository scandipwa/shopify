import { PureComponent } from 'react';

import ProductContext from '../../context/product';

/** @namespace ShopifyProducts/Component/ProductMedia/Component/ProductMediaComponent */
export class ProductMediaComponent extends PureComponent {
    static contextType = ProductContext;

    renderImage = ({ src, alt }, i) => (
        // TODO: use Image component here
        <img
          key={ i }
          src={ src }
          alt={ alt }
        />
    );

    render() {
        const { product: { images = [] } } = this.context;
        return images.map(this.renderImage);
    }
}

export default ProductMediaComponent;
