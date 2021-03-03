import CheckoutContext from '@scandipwa/shopify-nextjs-checkout/src/context/Checkout.context';
import { processProduct } from '@scandipwa/shopify-nextjs-products/src/api/Products.processor';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CheckoutLineItemType } from '../api/CheckoutLineItems.type';
import LineItemsContext from './LineItems.context';

/** @namespace ShopifyNextjsCheckoutLineItems/Context/LineItems/Provider/LineItemsProvider */
export class LineItemsProvider extends PureComponent {
    static contextType = CheckoutContext;

    static propTypes = {
        children: PropTypes.node.isRequired,
        lineItem: CheckoutLineItemType.isRequired
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            product: this.getProduct()
        };
    }

    getProduct() {
        const {
            lineItem: {
                variant,
                variant: {
                    product
                }
            }
        } = this.props;

        const processedProduct = { ...product };
        processProduct(processedProduct);
        processedProduct.variants = [variant];
        return processedProduct;
    }

    updateQuantity(quantity) {
        const { lineItem: { id } } = this.props;
        const { updateLineQtyItemById } = this.context;
        updateLineQtyItemById(id, quantity);
    }

    remove() {
        const { lineItem: { id } } = this.props;
        const { removeLineItemById } = this.context;
        removeLineItemById(id);
    }

    getContextValue() {
        const {
            product
        } = this.state;

        const {
            lineItem: {
                variant,
                quantity
            }
        } = this.props;

        return {
            product,
            quantity,
            selectedVariant: variant,
            updateQuantity: this.updateQuantity.bind(this),
            remove: this.remove.bind(this)
        };
    }

    render() {
        const { children } = this.props;

        return (
            <LineItemsContext.Provider value={ this.getContextValue() }>
                { children }
            </LineItemsContext.Provider>
        );
    }
}

export default LineItemsProvider;
