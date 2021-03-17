import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';
import { CustomerQuery } from '@scandipwa/shopify-customer/src/api/Customer.query';

/**
 * A type of `CustomerAddressQuery` associated with `getCustomerAddressField` function.
 * @example // Returns getter of customer address get query
 * import getCustomerAddressQueryByType, { ADDRESS_GET } from '%filename%';
 * const queryGetter = getCustomerAddressQueryByType(ADDRESS_GET);
 */
export const ADDRESS_GET = 'address';
/**
 * A type of `CustomerAddressQuery` associated with `getCustomerDefaultAddressField` function.
 * @example // Returns getter of default customer address get query
 * import getCustomerAddressQueryByType, { DEFAULT_ADDRESS_GET } from '%filename%';
 * const queryGetter = getCustomerAddressQueryByType(DEFAULT_ADDRESS_GET);
 */
export const DEFAULT_ADDRESS_GET = 'default_address';
/**
 * A type of `CustomerAddressQuery` associated with `getCustomerAddressCreateField` function.
 * @example // Returns getter of customer address create mutation
 * import getCustomerAddressQueryByType, { ADDRESS_CREATE } from '%filename%';
 * const queryGetter = getCustomerAddressQueryByType(ADDRESS_CREATE);
 */
export const ADDRESS_CREATE = 'address_create';
/**
 * A type of `CustomerAddressQuery` associated with `getCustomerAddressUpdateField` function.
 * @example // Returns getter of customer address update mutation
 * import getCustomerAddressQueryByType, { ADDERSS_UPDATE } from '%filename%';
 * const queryGetter = getCustomerAddressQueryByType(ADDERSS_UPDATE);
 */
export const ADDERSS_UPDATE = 'address_update';
/**
 * A type of `CustomerAddressQuery` associated with `getCustomerAddressDeleteField` function.
 * @example // Returns getter of customer address create mutation
 * import getCustomerAddressQueryByType, { ADDRESS_DELETE } from '%filename%';
 * const queryGetter = getCustomerAddressQueryByType(ADDRESS_DELETE);
 */
export const ADDRESS_DELETE = 'address_delete';

/**
 * Customer address query declaration.
 * Read more: [Query controller](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller), [TypedQuery](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#typedquery)
 * @namespace ShopifyCustomerAddress/Api/CustomerAddress/Query/CustomerAddressQuery */
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

    /**
     * Function that returns the list of address fields.
     * Read more: [Extending Query controllers](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#extension)
     */
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

    /**
     * Field getter for default customer address update [returns node]
     * @param {{id: String, token: String}} queryArguments
     */
    getCustomerDefaultAddressUpdateField({ id, token }) {
        return new Field('customerDefaultAddressUpdate')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('id', 'ID!', id)
            .addFieldList(this._getCustomerDefaultAddressUpdateField());
    }

    /**
     * Filed getter for customer address update [returns node]
     * @param {{id: String, token: String, address: any}} queryArguments
     */
    getCustomerAddressUpdateField({ id, token, address }) {
        return new Field('customerAddressUpdate')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('address', 'MailingAddressInput!', address)
            .addArgument('id', 'ID!', id)
            .addFieldList(this._getCustomerAddressUpdateField());
    }

    /**
     * Field getter for customer address deletion [returns node]
     * @param {{id: String, token: String}} queryArguments
     */
    getCustomerAddressDeleteField({ id, token }) {
        return new Field('customerAddressDelete')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('id', 'ID!', id)
            .addFieldList(this._getCustomerAddressDeleteFields());
    }

    /**
     * Field getter for customer address creation [returns node]
     * @param {{token: String, address: any}} queryArguments
     */
    getCustomerAddressCreateField({ address, token }) {
        return new Field('customerAddressCreate')
            .addArgument('customerAccessToken', 'String!', token)
            .addArgument('address', 'MailingAddressInput!', address)
            .addFieldList(this._getCustomerAddressCreateFields());
    }

    /**
     * Field getter for a list of customer addresses [returns edges]
     */
    getCustomerAddressField() {
        const ADDRESS_AMOUNT = 100;

        return new Field('addresses')
            .addArgument('first', 'Int', ADDRESS_AMOUNT)
            .addFieldList(this._getCustomerAddresssFields());
    }

    /**
     * Field getter for default customer address [returns node]
     */
    getCustomerDefaultAddressField() {
        return new Field('defaultAddress').addFieldList(
            this._getCustomerDefaultAddressFields()
        );
    }
}

export default mapQueryToType(CustomerAddressQuery);
