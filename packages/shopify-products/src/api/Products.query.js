import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';

/**
 * A type of `ProductsQuery` associated with `getProductsField` function.
 * @example // Returns getter of paginated product query
 * import getProductQueryByType, { PAGINATED_PRODUCTS } from '%filename%';
 * const queryGetter = getProductQueryByType(PAGINATED_PRODUCTS);
 */
export const PAGINATED_PRODUCTS = 'paginated';

/**
 * A type of `ProductsQuery` associated with `getProductByHandleField` function.
 * @example // Returns getter of single product query
 * import getProductQueryByType, { SINGLE_PRODUCT } from '%filename%';
 * const queryGetter = getProductQueryByType(SINGLE_PRODUCT);
 */
export const SINGLE_PRODUCT = 'single';

/**
 * A general product and product-list query declaration. This class is not intended to be used directly, instead prefer using "Typed Query" exported as default from this file.
 * Thus, you can use it with direct import, however the `this.currentType` won't be set, and it will be impossible distinguish if the product was requested as a list or as a single product.
 * @namespace ShopifyProducts/Api/Products/Query/ProductsQuery
 */
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

    /**
     * A function which returns an array of product fields.
     * @extPoint Use it to add product child fields (price, media, etc.)
     * @extExample (args, callback) => [...callback(...args), 'newField']
     */
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

    /**
     * General product list field getter [returns edges]
     * @param {{before: String, after: String, first: Number}} queryArguments
     */
    getProductsField({ before, after, first }) {
        return new Field('products')
            .addFieldList(this._getProductsFields())
            .addArgument('before', 'String', before)
            .addArgument('after', 'String', after)
            .addArgument('first', 'Int', first);
    }

    /**
     * General product field getter (by handle) [returns node]
     * @param {{handle: String}} queryArguments
     */
    getProductByHandleField({ handle }) {
        return new Field('productByHandle')
            .addFieldList(this._getProductFields())
            .addArgument('handle', 'String!', handle);
    }
}

export default mapQueryToType(ProductsQuery);
