import ProductContext from '@scandipwa/shopify-products/src/context/product';
import { PureComponent } from 'react';

/** @namespace ShopifyProduct-Variants/Component/ProductOptions/Component/ProductOptionsComponent */
export class ProductOptionsComponent extends PureComponent {
    static contextType = ProductContext;

    render() {
        // const { selectOption } = this.context;
        // selectOption('Size', '4');

        return 'test';
    }
}

export default ProductOptionsComponent;
