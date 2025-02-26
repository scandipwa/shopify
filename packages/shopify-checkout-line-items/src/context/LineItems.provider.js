import CheckoutContext from '@scandipwa/shopify-checkout/src/context/Checkout.context';
import { processProduct } from '@scandipwa/shopify-products/src/api/Products.processor';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CheckoutLineItemType } from '../api/CheckoutLineItems.type';
import LineItemsContext from './LineItems.context';

/**
 * Provider class for Line Items Context. Used to make line item data available to all children components.
 * @namespace ShopifyCheckoutLineItems/Context/LineItems/Provider/LineItemsProvider */
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

    /**
     * A function which returns an object that will be visible in the Line Item Context
     * @extPoint Add more fields to Line Item Context.
     * @extExample (args, callback, instance) => ({
     *      ...args,
     *      isLineItemLoaded: !!instance.props.lineItem
     * })
     */
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
