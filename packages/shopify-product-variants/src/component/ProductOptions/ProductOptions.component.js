import ProductContext from '@scandipwa/shopify-products/src/context/Products.context';
import { PureComponent } from 'react';

import ProductOption from '../ProductOption';

/**
 * Product Options Component. Used to display multiple Product Options
 * @namespace ShopifyProductVariants/Component/ProductOptions/Component/ProductOptionsComponent */
export class ProductOptionsComponent extends PureComponent {
    static contextType = ProductContext;

    renderOption({ name, values }) {
        return (
            <ProductOption
              key={ name }
              name={ name }
              values={ values }
            />
        );
    }

    renderOptions() {
        const { product: { options = [] } } = this.context;
        return options.map(this.renderOption);
    }

    render() {
        const {
            isHasOnlyOneVariant,
            isHasOptions
        } = this.context;

        if (!isHasOptions || isHasOnlyOneVariant) {
            return null;
        }

        return (
            <div block="ProductOptions">
                { this.renderOptions() }
            </div>
        );
    }
}

export default ProductOptionsComponent;
