import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-nextjs-api/src/api/query';
import { addPaginationArguments } from '@scandipwa/shopify-nextjs-api/src/util/applyPagination';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-nextjs-api/src/util/TypedQuery';

export const PAGINATED_PRODUCTS = 'paginated';
export const SINGLE_PRODUCT = 'single';

/** @namespace ShopifyNextjsProducts/Api/Products/Query/ProductsQuery */
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
        const SINGLE_PRODUCTS_IMAGES = 15;
        const PAGINATED_PRODUCTS_IMAGES = 1;

        const first = this.currentType === SINGLE_PRODUCT
            ? SINGLE_PRODUCTS_IMAGES
            : PAGINATED_PRODUCTS_IMAGES;

        return new Field('images')
            .addArgument('first', 'Int', first)
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

    getProductsField({
        before, after, first, last
    }) {
        const productsField = new Field('products')
            .addFieldList(this._getProductsFields());

        return addPaginationArguments({
            before,
            after,
            first,
            last,
            field: productsField
        });
    }

    getProductByHandleField({ handle }) {
        return new Field('productByHandle')
            .addFieldList(this._getProductFields())
            .addArgument('handle', 'String!', handle);
    }
}

export default mapQueryToType(ProductsQuery);