import { Field } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';

/**
 * A type of `CustomerQuery` associated with `getCustomerField` function.
 * @example // Returns getter of customer get query
 * import getCustomerQueryByType, { CUSTOMER_GET } from '%filename%';
 * const queryGetter = getCustomerQueryByType(CUSTOMER_GET);
 */
export const CUSTOMER_GET = 'customer';
/**
 * A type of `CustomerQuery` associated with `getCustomerCreateField` function.
 * @example // Returns getter of customer create mutation
 * import getCustomerQueryByType, { CUSTOMER_CREATE } from '%filename%';
 * const queryGetter = getCustomerQueryByType(CUSTOMER_CREATE);
 */
export const CUSTOMER_CREATE = 'customer_create';
/**
 * A type of `CustomerQuery` associated with `getCustomerAccessTokenCreateField` function.
 * @example // Returns getter of customer login query
 * import getCustomerQueryByType, { CUSTOMER_LOGIN } from '%filename%';
 * const queryGetter = getCustomerQueryByType(CUSTOMER_LOGIN);
 */
export const CUSTOMER_LOGIN = 'customer_login';
/**
 * A type of `CustomerQuery` associated with `getCustomerAccessTokenDeleteField` function.
 * @example // Returns getter of customer logout mutation
 * import getCustomerQueryByType, { CUSTOMER_LOGOUT } from '%filename%';
 * const queryGetter = getCustomerQueryByType(CUSTOMER_LOGOUT);
 */
export const CUSTOMER_LOGOUT = 'customer_logout';

/**
 * Customer query declaration.
 * Read more: [Query controller](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller), [TypedQuery](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#typedquery)
 * @namespace ShopifyCustomer/Api/Customer/Query/CustomerQuery */
export class CustomerQuery extends TypedQuery {
    typeMap = {
        [CUSTOMER_GET]: this.getCustomerField.bind(this),
        [CUSTOMER_CREATE]: this.getCustomerCreateField.bind(this),
        [CUSTOMER_LOGIN]: this.getCustomerAccessTokenCreateField.bind(this),
        [CUSTOMER_LOGOUT]: this.getCustomerAccessTokenDeleteField.bind(this)
    };

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

    /**
    * Function that returns the list of customer fields.
     * Read more: [Extending Query controllers](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#extension)
    */
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
            // this.getCustomerField({}),
            this._getCustomerUserErrorsField()
        ];
    }

    // TODO: handle customer recover
    // TODO: handle customer active

    /**
     * Customer create field getter [returns node]
     */
    getCustomerCreateField(input) {
        // use this query to request customer account creation
        return new Field('customerCreate')
            .addArgument('input', 'CustomerCreateInput!', input)
            .addFieldList(this._getCustomerCreateFields());
    }

    /**
     * Field getter for access token removal [returns node]
     * @param {{token: String}} queryArguments
     */
    getCustomerAccessTokenDeleteField({ token }) {
        // use this query to logout from customer account
        return new Field('customerAccessTokenDelete')
            .addArgument('customerAccessToken', 'String!', token)
            .addFieldList(this._getCustomerAccessTokenDeleteFields());
    }

    /**
     * Field getter for access token creation [returns node]
     */
    getCustomerAccessTokenCreateField(input) {
        // use this query to login into customer account
        return new Field('customerAccessTokenCreate')
            .addArgument('input', 'CustomerAccessTokenCreateInput!', input)
            .addFieldList(this._getCustomerAccessTokenCreateFields());
    }

    /**
     * Field getter for customer get [returns node]
     * @param {{token: String}} queryArguments
     */
    getCustomerField({ token }) {
        // get customer account data
        return new Field('customer')
            .addArgument('customerAccessToken', 'String!', token)
            .addFieldList(this._getCustomerFields());
    }
}

export default mapQueryToType(CustomerQuery);
