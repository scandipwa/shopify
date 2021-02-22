import { Field } from '@scandipwa/graphql';
import { addPaginationArguments } from '@scandipwa/shopify-nextjs-api/src/util/applyPagination';
import { ProductsQuery } from '@scandipwa/shopify-nextjs-products/src/api/Products.query';

export const COLLECTION_PRODUCTS_BEFORE_KEY = 'productsBefore';
export const COLLECTION_PRODUCTS_AFTER_KEY = 'productsAfter';

const addCollectionProductsFields = (args, callback) => {
    const COLLECTION_PRODUCTS_PAGE_SIZE = 1;
    // Assume that the first argument will contain pagination data
    const [{
        [COLLECTION_PRODUCTS_BEFORE_KEY]: before,
        [COLLECTION_PRODUCTS_AFTER_KEY]: after
    }] = args;
    const initialFields = callback(...args);
    const productQueryInstance = new ProductsQuery();
    const productsField = new Field('products')
        .addFieldList(productQueryInstance._getProductsFields());

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
