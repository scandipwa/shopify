import { Field } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';

export const SINGLE_PAGE = 'single';

/**
 * Page query declaration.
 * Read more: [Query controller](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller), [TypedQuery](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#typedquery)
 * @namespace ShopifyPages/Api/Page/Query/PageQuery */
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
