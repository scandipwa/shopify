import { Field } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';

/** @namespace ShopifyCustomer/Api/Customer/Query/CustomerQuery */
export class CustomerQuery extends TypedQuery {
    _getCustomerUserErrorsFields() {
        return [
            'code',
            'field',
            'message'
        ];
    }

    _getCustomerUserErrorsField() {
        return new Field('customerUserErrors')
            .addFieldList(this._getCustomerUserErrorsFields());
    }

    _getCustomerFields() {
        return [
            'id',
            'firstName',
            'lastName',
            'email',
            'phone',
            'displayName'
        ];
    }

    _getCustomerAccessTokenFields() {
        return [
            'accessToken',
            'expiresAt'
        ];
    }

    _getCustomerAccessTokenField() {
        return new Field('customerAccessToken')
            .addFieldList(this._getCustomerAccessTokenFields());
    }

    _getCustomerAccessTokenCreateFields() {
        return [
            this._getCustomerAccessTokenField(),
            this._getCustomerUserErrorsField()
        ];
    }

    _getCustomerAccessTokenDeleteFields() {
        return [];
    }

    _getCustomerCreateFields() {
        return [
            // using the same customer query, without the token
            this.getCustomerField({}),
            this._getCustomerUserErrorsField()
        ];
    }

    // TODO: handle customer recover
    // TODO: handle customer active

    getCustomerCreateField(input) {
        // use this query to request customer account creation
        return new Field('customerCreate')
            .addArgument('input', 'CustomerCreateInput!', input)
            .addFieldList(this._getCustomerCreateFields());
    }

    getCustomerAccessTokenDeleteField({ token }) {
        // use this query to logout from customer account
        return new Field('customerAccessTokenDelete')
            .addArgument('customerAccessToken', 'String!', token)
            .addFieldList(this._getCustomerAccessTokenDeleteFields());
    }

    getCustomerAccessTokenCreateField(input) {
        // use this query to login into customer account
        return new Field('customerAccessTokenCreate')
            .addArgument('input', 'CustomerAccessTokenCreateInput!', input)
            .addFieldList(this._getCustomerAccessTokenFields());
    }

    getCustomerField({ token }) {
        // get customer account data
        return new Field('customer')
            .addArgument('customerAccessToken', 'String!', token)
            .addFieldList(this._getCustomerFields());
    }
}

export default mapQueryToType(CustomerQuery);
