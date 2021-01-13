import { Field } from '@scandipwa/graphql';
import { getPageInfoField, mapQueryToType, TypedQuery } from '@scandipwa/shopify-api/src/api/query';

export const PAGINATED_COLLECTIONS = 'paginated';
export const SINGLE_COLLECTION = 'single';

/** @namespace ShopifyCollections/Api/Collections/Query/CollectionsQuery */
export class CollectionsQuery extends TypedQuery {
    typeMap = {
        [PAGINATED_COLLECTIONS]: this.getCollectionsField.bind(this),
        [SINGLE_COLLECTION]: this.getCollectionByHandleField.bind(this)
    };

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

    getCollectionsField({ first, after, before }) {
        return new Field('collections')
            .addFieldList(this._getCollectionsFields())
            .addArgument('before', 'String', before)
            .addArgument('after', 'String', after)
            .addArgument('first', 'Int', first);
    }

    getCollectionByHandleField({ handle }) {
        return new Field('collectionByHandle')
            .addArgument('handle', 'String!', handle)
            .addFieldList(this._getCollectionFields());
    }
}

export default mapQueryToType(CollectionsQuery);
