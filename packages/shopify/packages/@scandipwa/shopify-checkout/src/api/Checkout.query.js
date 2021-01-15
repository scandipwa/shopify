import { Field, Fragment } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api';

export const CREATE_CHECKOUT = 'create';
export const FETCH_CHECKOUT = 'fetch';

/** @namespace ShopifyCheckout/Api/Checkout/Query/CheckoutQuery */
export class CheckoutQuery extends TypedQuery {
    typeMap = {
        [CREATE_CHECKOUT]: this.getCreateCheckoutField.bind(this),
        [FETCH_CHECKOUT]: this.getCheckoutField.bind(this)
    };

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

    getCreateCheckoutField(input = {}) {
        return new Field('checkoutCreate')
            .addArgument('input', 'CheckoutCreateInput!', input)
            .addFieldList(this._getCreateCheckoutFields());
    }

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
