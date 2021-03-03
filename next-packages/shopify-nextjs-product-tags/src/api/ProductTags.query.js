import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyNextJsProductTags/Api/ProductTags/Query/ProductTagsQuery */
export class ProductTagsQuery {
    getTagsField() {
        return new Field('tags');
    }
}

export default new ProductTagsQuery();
