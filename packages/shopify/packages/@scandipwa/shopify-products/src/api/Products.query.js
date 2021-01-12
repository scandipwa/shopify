import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';

/** @namespace ShopifyProducts/Api/Products/Query/ProductsQuery */
export class ProductsQuery {
    _getProductFields() {
        return [
            'id',
            'productType',
            'handle',
            'title',
            'description',
            'descriptionHtml'
        ];
    }

    _getProductField() {
        return new Field('node')
            .addFieldList(this._getProductFields());
    }

    _getEdgesField() {
        return new Field('edges').addFieldList([
            'cursor',
            this._getProductField()
        ]);
    }

    _getProductsFields() {
        return [
            this._getEdgesField(),
            getPageInfoField()
        ];
    }

    getProductsField = ({ before, after, first }) => new Field('products')
        .addFieldList(this._getProductsFields())
        .addArgument('before', 'String', before)
        .addArgument('after', 'String', after)
        .addArgument('first', 'Int', first);

    getProductByHandleField = ({ handle }) => new Field('productByHandle')
        .addFieldList(this._getProductFields())
        .addArgument('handle', 'String!', handle);
}

export default new ProductsQuery();
