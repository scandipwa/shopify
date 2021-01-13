import { Field } from '@scandipwa/graphql';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';

export const PAGINATED_PRODUCTS = 'paginated';
export const SINGLE_PRODUCT = 'single';

/** @namespace ShopifyProducts/Api/Products/Query/ProductsQuery */
export class ProductsQuery extends TypedQuery {
    typeMap = {
        [PAGINATED_PRODUCTS]: this.getProductsField.bind(this),
        [SINGLE_PRODUCT]: this.getProductByHandleField.bind(this)
    };

    _getImagesFields() {
        return [
            new Field('transformedSrc').setAlias('src'),
            new Field('altText').setAlias('alt')
        ];
    }

    _getImagesField() {
        const MAX_IMAGES = 15;

        return new Field('images')
            .addArgument('first', 'Int', MAX_IMAGES)
            .addField(new Field('edges')
                .addField(new Field('node')
                    .addFieldList(this._getImagesFields())));
    }

    _getProductFields() {
        return [
            'id',
            'productType',
            'handle',
            'title',
            'description',
            'descriptionHtml',
            this._getImagesField()
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

    getProductsField({ before, after, first }) {
        return new Field('products')
            .addFieldList(this._getProductsFields())
            .addArgument('before', 'String', before)
            .addArgument('after', 'String', after)
            .addArgument('first', 'Int', first);
    }

    getProductByHandleField({ handle }) {
        return new Field('productByHandle')
            .addFieldList(this._getProductFields())
            .addArgument('handle', 'String!', handle);
    }
}

export default mapQueryToType(ProductsQuery);
