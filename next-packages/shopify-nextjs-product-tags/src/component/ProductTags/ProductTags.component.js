import { PureComponent } from 'react';

// Ugly fix
import ProductContext from '../../../../shopify-nextjs-products/src/context/Products.context';
import ProductTag from '../ProductTag';

/** @namespace ShopifyNextJsProductTags/Component/ProductTags/Component/ProductTagsComponent */
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

    renderProductTags(tags) {
        return tags.map(this.renderProductTag);
    }

    render() {
        const { product: { tags } } = this.context;
        if (!tags.length) {
            return null;
        }

        return (
            <div block="ProductTags">
              { this.renderProductTags(tags) }
            </div>
        );
    }
}

export default ProductTagsComponent;
