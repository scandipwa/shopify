import { Field } from '@scandipwa/graphql';

/**
 * Product tags query declaration
 * @namespace ShopifyProductTags/Api/ProductTags/Query/ProductTagsQuery */
export class ProductTagsQuery {
    /**
     * Getter for product tags field
     */
    getTagsField() {
        return new Field('tags');
    }
}

export default new ProductTagsQuery();
