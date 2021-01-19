import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyShop/Api/Shop/Query/ShopQuery */
export class ShopQuery {
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
