import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/util/TypedQuery';

/**
 * A type of `CollectionsQuery` associated with `getCollectionsField` function.
 * @example // Returns getter of paginated collections query
 * import getCollectionQueryByType, { PAGINATED_COLLECTIONS } from '%filename%';
 * const queryGetter = getCollectionQueryByType(PAGINATED_COLLECTIONS);
 */
export const PAGINATED_COLLECTIONS = 'paginated';
/**
 * A type of `CollectionsQuery` associated with `getCollectionByHandleField` function.
 * @example // Returns getter of single collection query
 * import getCollectionQueryByType, { SINGLE_COLLECTION } from '%filename%';
 * const queryGetter = getCollectionQueryByType(SINGLE_COLLECTION);
 */
export const SINGLE_COLLECTION = 'single';

/**
 * A general collection and collection-list query declaration. This class is not intended to be used directly, instead prefer using "Typed Query" exported as default from this file.
 * Thus, you can use it with direct import, however the `this.currentType` won't be set, and it will be impossible distinguish if the collection was requested as a list or as a single collection.
 * @namespace ShopifyCollections/Api/Collections/Query/CollectionsQuery */
export class CollectionsQuery extends TypedQuery {
    typeMap = {
        [PAGINATED_COLLECTIONS]: this.getCollectionsField.bind(this),
        [SINGLE_COLLECTION]: this.getCollectionByHandleField.bind(this)
    };

    /**
     * A function which returns an array of collection fields.
     * @extPoint Use it to add collection child fields (products, for example)
     * @extExample (args, callback) => [...callback(...args), 'newField']
     */
    _getCollectionFields() {
        return [
            'description',
            'descriptionHtml',
            'handle',
            'title',
            new Field('image').addFieldList([
                new Field('transformedSrc').setAlias('src'),
                new Field('altText').setAlias('alt')
            ])
        ];
    }

    _getCollectionField() {
        return new Field('node').addFieldList(
            this._getCollectionFields()
        );
    }

    _getEdgesField() {
        return new Field('edges').addFieldList([
            'cursor',
            this._getCollectionField()
        ]);
    }

    _getCollectionsFields() {
        return [
            this._getEdgesField(),
            getPageInfoField()
        ];
    }

    /**
     * General collection list field getter [returns edges]
     * @param {{before: String, after: String, first: Number}} queryArguments
     */
    getCollectionsField({ first, after, before }) {
        return new Field('collections')
            .addFieldList(this._getCollectionsFields())
            .addArgument('before', 'String', before)
            .addArgument('after', 'String', after)
            .addArgument('first', 'Int', first);
    }

    /**
     * General collection field getter (by handle) [returns node]
     * @param {{handle: String}} queryArguments
     */
    getCollectionByHandleField({ handle }) {
        return new Field('collectionByHandle')
            .addArgument('handle', 'String!', handle)
            .addFieldList(this._getCollectionFields());
    }
}

export default mapQueryToType(CollectionsQuery);
