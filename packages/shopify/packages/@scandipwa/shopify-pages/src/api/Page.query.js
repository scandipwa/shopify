import { Field } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/api/query';

export const SINGLE_PAGE = 'single';

/** @namespace ShopifyPages/Api/Page/Query/PageQuery */
export class PageQuery extends TypedQuery {
    typeMap = {
        [SINGLE_PAGE]: this.getPageByHandleField.bind(this)
    };

    _getPageFields() {
        return [
            'id',
            'title',
            'body'
        ];
    }

    getPageByHandleField({ handle }) {
        return new Field('pageByHandle')
            .addFieldList(this._getPageFields())
            .addArgument('handle', 'String!', handle);
    }
}

export default mapQueryToType(PageQuery);
