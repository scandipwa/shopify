import { Field } from '@scandipwa/graphql';

/** @namespace ShopifyCollections/Api/Collections/Query/CollectionsQuery */
export class CollectionsQuery {
    _getCollectionFields() {
        return [
            'description',
            'descriptionHtml',
            'handle',
            'title',
            new Field('image').addFieldList([
                'altText',
                'transformedSrc'
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
            new Field('cursor'),
            this._getCollectionField()
        ]);
    }

    _getPageInfoField() {
        return new Field('pageInfo').addFieldList([
            'hasNextPage',
            'hasPreviousPage'
        ]);
    }

    _getCollectionsFields() {
        return [
            this._getEdgesField(),
            this._getPageInfoField()
        ];
    }

    getCollectionsQuery({ first, after, before }) {
        return new Field('collections')
            .addFieldList(this._getCollectionsFields())
            .addArgument('before', 'String', before)
            .addArgument('after', 'String', after)
            .addArgument('first', 'Int', first);
    }

    getCollectionByHandleQuery({ handle }) {
        return new Field('collectionByHandle')
            .addArgument('handle', 'String!', handle)
            .addFieldList(this._getCollectionFields());
    }
}

export default new CollectionsQuery();
