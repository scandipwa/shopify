import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyProductPrices/Api/ProductPrices/Query/ProductPricesQuery */
export class ProductPricesQuery {
    _getPriceFields() {
        return [
            'amount',
            'currencyCode' // shall we ?
        ];
    }

    _getMinVariantPrice() {
        return new Field('minVariantPrice')
            .addFieldList(this._getPriceFields());
    }

    _getMaxVariantPrice() {
        return new Field('maxVariantPrice')
            .addFieldList(this._getPriceFields());
    }

    _getPriceRangeFields() {
        return [
            this._getMinVariantPrice(),
            this._getMaxVariantPrice()
        ];
    }

    getCompareAtPriceField() {
        return new Field('compareAtPriceV2')
            .setAlias('compareAtPrice')
            .addFieldList(this._getPriceFields());
    }

    getPriceField() {
        return new Field('priceV2')
            .setAlias('price')
            .addFieldList(this._getPriceFields());
    }

    getPriceRangeField() {
        return new Field('priceRange')
            .addFieldList(this._getPriceRangeFields());
    }
}

export default new ProductPricesQuery();
