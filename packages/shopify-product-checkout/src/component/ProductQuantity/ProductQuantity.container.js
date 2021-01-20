import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';

import ProductQuantityComponent from './ProductQuantity.component';

/** @namespace ShopifyProduct-Checkout/Component/ProductQuantity/Container/ProductQuantityContainer */
export class ProductQuantityContainer extends HigherOrderComponent {
    static contextType = ProductContext;

    containerFunctions = {
        onChange: this.onChange.bind(this)
    };

    onChange({ target: { value } }) {
        const { updateQuantity } = this.context;
        updateQuantity(+value);
    }
}

export default withHOC(
    ProductQuantityContainer,
    ProductQuantityComponent
);
