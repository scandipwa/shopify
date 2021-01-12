import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-api/src/api/query';

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

    getCollectionsField = ({ first, after, before }) => new Field('collections')
        .addFieldList(this._getCollectionsFields())
        .addArgument('before', 'String', before)
        .addArgument('after', 'String', after)
        .addArgument('first', 'Int', first);

    getCollectionByHandleField = ({ handle }) => new Field('collectionByHandle')
        .addArgument('handle', 'String!', handle)
        .addFieldList(this._getCollectionFields());
}

export default new CollectionsQuery();
