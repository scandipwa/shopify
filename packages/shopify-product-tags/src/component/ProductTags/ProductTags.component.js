import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';
import { PureComponent } from 'react';

import ProductTag from '../ProductTag';

/** @namespace ShopifyProductTags/Component/ProductTags/Component/ProductTagsComponent */
export class ProductTagsComponent extends PureComponent {
    static contextType = ProductContext;

    renderProductTag(tag) {
        return (
            <ProductTag
              key={ tag }
              label={ tag }
            />
        );
    }

    renderProductTags() {
        const { product: { tags = [] } } = this.context;

        return tags.map(this.renderProductTag);
    }

    render() {
        const { product: { tags = [] } } = this.context;

        if (!tags.length) {
            return null;
        }

        return (
            <div block="ProductTags">
                { this.renderProductTags() }
            </div>
        );
    }
}

export default ProductTagsComponent;
