import { Field, Fragment } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';

/**
 * A type of `CheckoutQuery` associated with `getCreateCheckoutField` function.
 * @example // Returns getter of create checkout mutation
 * import getCheckoutQueryByType, { CREATE_CHECKOUT } from '%filename%';
 * const queryGetter = getCheckoutQueryByType(CREATE_CHECKOUT);
 */
export const CREATE_CHECKOUT = 'create';
/**
 * A type of `CheckoutQuery` associated with `getCheckoutField` function.
 * @example // Returns getter of checkout query
 * import getCheckoutQueryByType, { FETCH_CHECKOUT } from '%filename%';
 * const queryGetter = getCheckoutQueryByType(FETCH_CHECKOUT);
 */
export const FETCH_CHECKOUT = 'fetch';

/** Checkout query declaration.
 * Read more: [Query controller](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller), [TypedQuery](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#typedquery)
 * @namespace ShopifyCheckout/Api/Checkout/Query/CheckoutQuery */
export class CheckoutQuery extends TypedQuery {
    typeMap = {
        [CREATE_CHECKOUT]: this.getCreateCheckoutField.bind(this),
        [FETCH_CHECKOUT]: this.getCheckoutField.bind(this)
    };

    /**
     * Function that returns an array of checkout fields.
     * Read more: [Extending Query controllers](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#extension)
     */
    _getCheckoutFields() {
        return [
            'id',
            'webUrl'
        ];
    }

    _getCheckoutField() {
        return new Field('checkout')
            .addFieldList(this._getCheckoutFields());
    }

    _getCreateCheckoutFields() {
        return [
            this._getCheckoutField()
        ];
    }

    /**
     * Create checkout fields getter [returns node]
     */
    getCreateCheckoutField(input = {}) {
        return new Field('checkoutCreate')
            .addArgument('input', 'CheckoutCreateInput!', input)
            .addFieldList(this._getCreateCheckoutFields());
    }

    /**
     * Checkout by ID fields getter [returns node]
     * @param {{ id: String }} queryArguments
     */
    getCheckoutField({ id }) {
        return new Field('node')
            .setAlias('checkout')
            .addArgument('id', 'ID!', id)
            .addField(
                new Fragment('Checkout')
                    .addFieldList(this._getCheckoutFields())
            );
    }
}

export default mapQueryToType(CheckoutQuery);
