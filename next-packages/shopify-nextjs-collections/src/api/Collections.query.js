import { Field } from '@scandipwa/graphql';
import { getPageInfoField } from '@scandipwa/shopify-nextjs-api/src/api/query';
import { mapQueryToType, TypedQuery } from '@scandipwa/shopify-nextjs-api/src/util/TypedQuery';

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

    getCollectionsField({
        first, after, before, last
    }) {
        const collectionsField = new Field('collections')
            .addFieldList(this._getCollectionsFields());

        // Similar code is going to be used for other modules
        // We might want to define it as a helper for further reusage
        if (first && after) {
            collectionsField
                .addArgument('after', 'String', after)
                .addArgument('first', 'Int', first);
        } else if (last && before) {
            collectionsField
                .addArgument('before', 'String', before)
                .addArgument('last', 'Int', last);
        } else {
            collectionsField
                .addArgument('first', 'Int', first);
        }

        return collectionsField;
    }

    getCollectionByHandleField({ handle }) {
        return new Field('collectionByHandle')
            .addArgument('handle', 'String!', handle)
            .addFieldList(this._getCollectionFields());
    }
}

export default mapQueryToType(CollectionsQuery);