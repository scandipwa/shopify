import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';
import { CustomerQuery } from '@scandipwa/shopify-customer/src/api/Customer.query';

export const ADDRESS_GET = 'address';
export const DEFAULT_ADDRESS_GET = 'default_address';
export const ADDRESS_CREATE = 'address_create';
export const ADDERSS_UPDATE = 'address_update';
export const ADDRESS_DELETE = 'address_delete';

/** @namespace ShopifyCustomerAddress/Api/CustomerAddress/Query/CustomerAddressQuery */
export class CustomerAddressQuery extends TypedQuery {
    typeMap = {
        [ADDRESS_GET]: this.getCustomerAddressField.bind(this),
        [DEFAULT_ADDRESS_GET]: this.getCustomerDefaultAddressField.bind(this),
        [ADDRESS_CREATE]: this.getCustomerAddressCreateField.bind(this),
        [ADDERSS_UPDATE]: this.getCustomerAddressUpdateField.bind(this),
        [ADDRESS_DELETE]: this.getCustomerAddressDeleteField.bind(this)
    };

    _getCustomerDefaultAddressFields() {
        return [
            'id'
        ];
    }

    _getAddressFields() {
        return [
            'id',
            'firstName',
            'lastName',
            'company',
            'address1',
            'address2',
            'city',
            'country',
            'province',
            'zip',
            'phone',
            new Field('formatted')
                .addArgument('withName', 'Boolean', true)
                .addArgument('withCompany', 'Boolean', true)
        ];
    }

    _getAddressField() {
        return new Field('node').addFieldList(
            this._getAddressFields()
        );
    }

    _getEdgesField() {
        return new Field('edges').addFieldList([
            'cursor',
            this._getAddressField()
        ]);
    }

    _getCustomerAddresssFields() {
        return [
            this._getEdgesField(),
            getPageInfoField()
        ];
    }

    _getCustomerAddressCreateFields() {
        const customerQuery = new CustomerQuery();
        return [customerQuery._getCustomerUserErrorsField()];
    }

    _getCustomerAddressDeleteFields() {
        const customerQuery = new CustomerQuery();
        return [customerQuery._getCustomerUserErrorsField()];
    }

    _getCustomerAddressUpdateField() {
        const customerQuery = new CustomerQuery();
        return [customerQuery._getCustomerUserErrorsField()];
    }

    _getCustomerDefaultAddressUpdateField() {
        const customerQuery = new CustomerQuery();
        return [customerQuery._getCustomerUserErrorsField()];
    }

    getCustomerDefaultAddressUpdateField({ id, token }) {
        return new Field('customerDefaultAddressUpdate')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('id', 'ID!', id)
            .addFieldList(this._getCustomerDefaultAddressUpdateField());
    }

    getCustomerAddressUpdateField({ id, token, address }) {
        return new Field('customerAddressUpdate')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('address', 'MailingAddressInput!', address)
            .addArgument('id', 'ID!', id)
            .addFieldList(this._getCustomerAddressUpdateField());
    }

    getCustomerAddressDeleteField({ id, token }) {
        return new Field('customerAddressDelete')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('id', 'ID!', id)
            .addFieldList(this._getCustomerAddressDeleteFields());
    }

    getCustomerAddressCreateField({ address, token }) {
        return new Field('customerAddressCreate')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('address', 'MailingAddressInput!', address)
            .addFieldList(this._getCustomerAddressCreateFields());
    }

    getCustomerAddressField() {
        const ADDRESS_AMOUNT = 100;

        return new Field('addresses')
            .addArgument('first', 'Int', ADDRESS_AMOUNT)
            .addFieldList(this._getCustomerAddresssFields());
    }

    getCustomerDefaultAddressField() {
        return new Field('defaultAddress').addFieldList(
            this._getCustomerDefaultAddressFields()
        );
    }
}

export default mapQueryToType(CustomerAddressQuery);
