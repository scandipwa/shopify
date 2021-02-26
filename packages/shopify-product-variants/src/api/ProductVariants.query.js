import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';

/**
 * Product variants query declaration.
 * @namespace ShopifyProductVariants/Api/ProductVariants/Query/ProductVariantsQuery */
export class ProductVariantsQuery {
    /**
     * A function which returns an array of product variant fields
     * @extPoint Add more variant fields to the query (price, metafields, etc.)
     * @extExample (args, callback) => [...callback(...args), 'newField']
     */
    _getVariantFields() {
        return [
            'id',
            'sku',
            'title',
            this._getImageField(),
            this._getSelectedOptionsField()
        ];
    }

    _getSelectedOptionsField() {
        return new Field('selectedOptions')
            .addFieldList([
                'name',
                'value'
            ]);
    }

    _getImageField() {
        return new Field('image')
            .addField('id');
    }

    _getVariantField() {
        return new Field('node')
            .addFieldList(this._getVariantFields());
    }

    _getEdgesField() {
        return new Field('edges').addFieldList([
            'cursor',
            this._getVariantField()
        ]);
    }

    _getVariantsFields() {
        return [
            this._getEdgesField(),
            getPageInfoField()
        ];
    }

    /**
     * Getter for product variants [returns edges]
     * @param {{first: Number}} queryArguments
     */
    getVariantsField({ first }) {
        return new Field('variants')
            .addArgument('first', 'Int', first)
            .addFieldList(this._getVariantsFields());
    }

    /**
     * Getter for variant options [returns edges]
     */
    getOptionsField() {
        const PRODUCT_OPTIONS_COUNT = 100;

        return new Field('options')
            .addArgument('first', 'Int', PRODUCT_OPTIONS_COUNT)
            .addFieldList([
                'id',
                'name',
                'values'
            ]);
    }
}

export default new ProductVariantsQuery();
