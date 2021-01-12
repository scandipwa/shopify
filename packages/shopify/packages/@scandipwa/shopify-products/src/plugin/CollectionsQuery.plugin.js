const setCollectionsFlag = (isIncludeProducts) => ((args, callback, instance) => {
    // eslint-disable-next-line no-param-reassign
    instance.isIncludeProducts = isIncludeProducts;
    return callback(...args);
});

const addProductField = (args, callback, instance) => {
    const { isIncludeProducts } = instance;

    if (!isIncludeProducts) {
        return callback(...args);
    }

    console.log('INJECTING...');

    // TODO: inject products
    return callback(...args);
};

export default {
    'ShopifyCollections/Api/Collections/Query/CollectionsQuery': {
        'member-function': {
            getCollectionsQuery: setCollectionsFlag(false),
            getCollectionByHandleQuery: setCollectionsFlag(true),
            _getCollectionFields: addProductField
        }
    }
};
