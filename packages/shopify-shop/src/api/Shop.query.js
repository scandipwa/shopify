import { Field } from '@scandipwa/graphql';

/**
 *  * Query declarations for shop
 * @namespace ShopifyShop/Api/Shop/Query/ShopQuery */
export class ShopQuery {
    /**
     * A function which returns an array of shop fields
     * @extPoint Use it to add more fields for shop query (payment settings, privacy policy, etc.)
     * @extExample (args, callback) => [...callback(...args), 'newField']
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
