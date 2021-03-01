import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';
import { CheckoutQuery } from '@scandipwa/shopify-checkout/src/api/Checkout.query';
import { ProductVariantsQuery } from '@scandipwa/shopify-product-variants/src/api/ProductVariants.query';
import { ProductsQuery } from '@scandipwa/shopify-products/src/api/Products.query';

/**
 * A type of `CheckoutLineItemsQuery` associated with `getCheckoutLineItemsField` function.
 * @example // Returns getter of checkout line item fields.
 * import getCheckoutLineItemsQueryByType, { CHECKOUT_LINE_ITEMS } from '%filename%';
 * const queryGetter = getCheckoutLineItemsQueryByType(CHECKOUT_LINE_ITEMS);
 */
export const CHECKOUT_LINE_ITEMS = 'checkout';
/**
 * A type of `CheckoutLineItemsQuery` associated with `getLineItemsAddField` function.
 * @example // Returns getter of add checkout line item mutation fields.
 * import getCheckoutLineItemsQueryByType, { ADD_LINE_ITEMS } from '%filename%';
 * const queryGetter = getCheckoutLineItemsQueryByType(ADD_LINE_ITEMS);
 */
export const ADD_LINE_ITEMS = 'add';
/**
 * A type of `CheckoutLineItemsQuery` associated with `getLineItemsRemoveField` function.
 * @example // Returns getter of remove checkout line item mutation fields.
 * import getCheckoutLineItemsQueryByType, { REMOVE_LINE_ITEMS } from '%filename%';
 * const queryGetter = getCheckoutLineItemsQueryByType(REMOVE_LINE_ITEMS);
 */
export const REMOVE_LINE_ITEMS = 'remove';
/**
 * A type of `CheckoutLineItemsQuery` associated with `getLineItemsUpdateField` function.
 * @example // Returns getter of update checkout line item mutation fields.
 * import getCheckoutLineItemsQueryByType, { UPDATE_LINE_ITEMS } from '%filename%';
 * const queryGetter = getCheckoutLineItemsQueryByType(UPDATE_LINE_ITEMS);
 */
export const UPDATE_LINE_ITEMS = 'update';

/**
 * Query declaration for Checkout line items. Uses "Typed Query" and should not be used directly, instea access its methods by using the default export.
 * @namespace ShopifyCheckoutLineItems/Api/CheckoutLineItems/Query/CheckoutLineItemsQuery */
export class CheckoutLineItemsQuery extends TypedQuery {
    typeMap = {
        [CHECKOUT_LINE_ITEMS]: this.getCheckoutLineItemsField.bind(this),
        [ADD_LINE_ITEMS]: this.getLineItemsAddField.bind(this),
        [UPDATE_LINE_ITEMS]: this.getLineItemsUpdateField.bind(this),
        [REMOVE_LINE_ITEMS]: this.getLineItemsRemoveField.bind(this)
    };

    _getVariantProductFields() {
        const query = new ProductsQuery();
        return query._getProductFields();
    }

    _getVariantProductField() {
        return new Field('product')
            .addFieldList(this._getVariantProductFields());
    }

    _getVariantFields() {
        const query = new ProductVariantsQuery();

        return [
            ...query._getVariantFields(),
            this._getVariantProductField()
        ];
    }

    _getVariantField() {
        return new Field('variant')
            .addFieldList(this._getVariantFields());
    }

    _getLineItemFields() {
        return [
            'id',
            'quantity',
            this._getVariantField()
        ];
    }

    _getLineItemField() {
        return new Field('node').addFieldList(
            this._getLineItemFields()
        );
    }

    _getEdgesField() {
        return new Field('edges').addFieldList([
            'cursor',
            this._getLineItemField()
        ]);
    }

    _getCheckoutLineItemsFields() {
        return [
            this._getEdgesField(),
            getPageInfoField()
        ];
    }

    _getCheckoutField() {
        const checkoutQuery = new CheckoutQuery();
        return checkoutQuery._getCheckoutField();
    }

    _getLineItemsAddFields() {
        return [this._getCheckoutField()];
    }

    _getLineItemsRemoveFields() {
        return [this._getCheckoutField()];
    }

    _getLineItemsUpdateFields() {
        return [this._getCheckoutField()];
    }

    /**
     * Remove line items from checkout mutation getter [returns node]
     * @param {{checkoutId: String, lineItemsIds: String[]}} queryArguments
     */
    getLineItemsRemoveField({ checkoutId, lineItemsIds }) {
        return new Field('checkoutLineItemsRemove')
            .addArgument('lineItemIds', '[ID!]!', lineItemsIds)
            .addArgument('checkoutId', 'ID!', checkoutId)
            .addFieldList(this._getLineItemsRemoveFields());
    }

    /**
     * Add line items to checkout mutation getter [returns node]
     * @param {{checkoutId: String, lineItems: any[]}} queryArguments
     */
    getLineItemsAddField({ checkoutId, lineItems }) {
        return new Field('checkoutLineItemsAdd')
            .addArgument('lineItems', '[CheckoutLineItemInput!]!', lineItems)
            .addArgument('checkoutId', 'ID!', checkoutId)
            .addFieldList(this._getLineItemsAddFields());
    }

    /**
     * Update line items in checkout mutation getter [returns node]
     * @param {{checkoutId: String, lineItems: any[]}} queryArguments
     */
    getLineItemsUpdateField({ checkoutId, lineItems }) {
        return new Field('checkoutLineItemsUpdate')
            .addArgument('lineItems', '[CheckoutLineItemUpdateInput!]!', lineItems)
            .addArgument('checkoutId', 'ID!', checkoutId)
            .addFieldList(this._getLineItemsUpdateFields());
    }

    /**
     * Get line items in checkout query getter [returns node]
     */
    getCheckoutLineItemsField() {
        const LINE_ITEMS_COUNT = 100;

        return new Field('lineItems')
            .addFieldList(this._getCheckoutLineItemsFields())
            .addArgument('first', 'Int', LINE_ITEMS_COUNT);
    }
}

export default mapQueryToType(CheckoutLineItemsQuery);
