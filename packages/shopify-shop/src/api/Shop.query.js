import { Field } from '@scandipwa/graphql';

/**
 *  * Query declarations for shop
 * Read more: [Query controller](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller)
 * @namespace ShopifyShop/Api/Shop/Query/ShopQuery */
export class ShopQuery {
    /**
     * A function which returns an array of shop fields
     * Read more: [Extending Query controllers](https://app.gitbook.com/@scandipwa/s/shopify/solutions/query-controller#extension)
     */
    _getShopFields() {
        return [
            'name',
            'description'
        ];
    }

    getShopField() {
        return new Field('shop')
            .addFieldList(this._getShopFields());
    }
}

export default new ShopQuery();
