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

    _getCollectionsFields() {
        return [
            this._getEdgesField()
        ];
    }

    getCollectionsQuery({ amount, after }) {
        const collections = new Field('collections')
            .addArgument('first', 'Int', amount)
            .addFieldList(this._getCollectionsFields());

        if (after) {
            // add after only if it is set by request
            collections.addArgument('after', 'String', after);
        }

        return collections;
    }

    getCollectionByHandleQuery({ handle }) {
        return new Field('collectionByHandle')
            .addArgument('handle', 'String!', handle)
            .addFieldList(this._getCollectionFields());
    }
}

export default new CollectionsQuery();
