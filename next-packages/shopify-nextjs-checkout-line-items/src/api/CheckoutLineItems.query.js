import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-nextjs-api/src/api/query';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-nextjs-api/src/util/TypedQuery';
import { CheckoutQuery } from '@scandipwa/shopify-nextjs-checkout/src/api/Checkout.query';
import { ProductVariantsQuery } from '@scandipwa/shopify-nextjs-product-variants/src/api/ProductVariants.query';
import { ProductsQuery } from '@scandipwa/shopify-nextjs-products/src/api/Products.query';

export const CHECKOUT_LINE_ITEMS = 'checkout';
export const ADD_LINE_ITEMS = 'add';
export const REMOVE_LINE_ITEMS = 'remove';
export const UPDATE_LINE_ITEMS = 'update';

/** @namespace ShopifyNextjsCheckoutLineItems/Api/CheckoutLineItems/Query/CheckoutLineItemsQuery */
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

    getLineItemsRemoveField({ checkoutId, lineItemsIds }) {
        return new Field('checkoutLineItemsRemove')
            .addArgument('lineItemIds', '[ID!]!', lineItemsIds)
            .addArgument('checkoutId', 'ID!', checkoutId)
            .addFieldList(this._getLineItemsRemoveFields());
    }

    getLineItemsAddField({ checkoutId, lineItems }) {
        return new Field('checkoutLineItemsAdd')
            .addArgument('lineItems', '[CheckoutLineItemInput!]!', lineItems)
            .addArgument('checkoutId', 'ID!', checkoutId)
            .addFieldList(this._getLineItemsAddFields());
    }

    getLineItemsUpdateField({ checkoutId, lineItems }) {
        return new Field('checkoutLineItemsUpdate')
            .addArgument('lineItems', '[CheckoutLineItemUpdateInput!]!', lineItems)
            .addArgument('checkoutId', 'ID!', checkoutId)
            .addFieldList(this._getLineItemsUpdateFields());
    }

    getCheckoutLineItemsField() {
        const LINE_ITEMS_COUNT = 100;

        return new Field('lineItems')
            .addFieldList(this._getCheckoutLineItemsFields())
            .addArgument('first', 'Int', LINE_ITEMS_COUNT);
    }
}

export default mapQueryToType(CheckoutLineItemsQuery);
