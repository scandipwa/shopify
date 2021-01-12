import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyPages/Api/Page/Query/PageQuery */
export class PageQuery {
    _getPageFields() {
        return [
            'id',
            'title',
            'body'
        ];
    }

    getPageByHandleField = ({ handle }) => new Field('pageByHandle')
        .addFieldList(this._getPageFields())
        .addArgument('handle', 'String!', handle);
}

export default new PageQuery();
