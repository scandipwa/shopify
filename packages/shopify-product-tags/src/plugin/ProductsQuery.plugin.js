import ProductTagsQuery from '../api/ProductTags.query';

const addTagsField = (args, callback) => {
    const originalProductFields = callback(...args);

    return [
        ...originalProductFields,
        ProductTagsQuery.getTagsField()
    ];
};

export default {
    'ShopifyProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addTagsField
        }
    }
};
