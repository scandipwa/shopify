import { processCollectionProducts } from '../api/CollectionProducts.processor';

const addProcessCollectionProducts = (args, callback) => {
    const collectionByHandle = callback(...args);

    return processCollectionProducts({ collectionByHandle });
};

export default {
    'ShopifyNextjsCollections/Api/Collections/Processor/processCollectionByHandleResponse': {
        function: addProcessCollectionProducts
    }
};
