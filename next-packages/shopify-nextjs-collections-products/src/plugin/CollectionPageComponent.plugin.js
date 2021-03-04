import { createElement } from 'react';

import CollectionProductsComponent from '../component/CollectionProducts/CollectionProducts.component';

export const addCollectionProducts = (member, instance) => {
    const COLLECTION_PRODUCTS_POSITION = 4000;

    member.addItem(
        () => {
            const { collection } = instance.props;
            const { products: productsResponse } = collection;

            return createElement(CollectionProductsComponent, { productsResponse });
        },
        'collectionPageProducts',
        COLLECTION_PRODUCTS_POSITION
    );

    return member;
};

export default {
    'ShopifyNextjsCollections/Component/CollectionPage/Component/CollectionPageComponent': {
        'member-property': {
            sortedRenderList: addCollectionProducts
        }
    }
};
