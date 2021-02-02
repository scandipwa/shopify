import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyProductTags/Api/ProductTags/Query/ProductTagsQuery */
export class ProductTagsQuery {
    getTagsField() {
        return this._getTagsField();
    }

    _getTagsField() {
        return new Field('tags');
    }
}

export default new ProductTagsQuery();
