import ProductTagsQuery from '../api/ProductTags.query';

const addTagsField = (args, callback) => {
    const originalProductFields = callback(...args);

    return [
        ...originalProductFields,
        ProductTagsQuery.getTagsField()
    ];
};

export default {
    'ShopifyNextjsProducts/Api/Products/Query/ProductsQuery': {
        'member-function': {
            _getProductFields: addTagsField
        }
    }
};
