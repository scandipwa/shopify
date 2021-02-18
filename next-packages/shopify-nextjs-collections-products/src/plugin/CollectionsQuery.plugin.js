import { Field } from '@scandipwa/graphql';
import { addPaginationArguments } from '@scandipwa/shopify-nextjs-api/src/util/applyPagination';
import { ProductsQuery } from '@scandipwa/shopify-nextjs-products/src/api/Products.query';

const addCollectionProductsFields = (args, callback) => {
    console.log('It works!');

    const COLLECTION_PRODUCTS_PAGE_SIZE = 10;
    // Assume that the first argument will contain pagination data
    // TODO: Check if there is a more consistent way of doing this
    const [{ products = {} }] = args;
    const { before, after } = products;
    const initialFields = callback(...args);
    const productsField = new Field('products')
        .addFieldList(ProductsQuery._getProductsField());

    const paginatedProductsField = addPaginationArguments({
        first: COLLECTION_PRODUCTS_PAGE_SIZE,
        last: COLLECTION_PRODUCTS_PAGE_SIZE,
        before,
        after,
        field: productsField
    });

    return initialFields
        .addField(paginatedProductsField);
};

export default {
    'ShopifyNextjsCollections/Api/Collections/Query/CollectionsQuery': {
        'member-function': {
            getCollectionByHandleField: addCollectionProductsFields
        }
    }
};
