import { lazy, Suspense } from 'react';

import CollectionProductsFallback from '../component/CollectionProductsFallback';

const CollectionProducts = lazy(() => import('../component/CollectionProducts'));

const renderProductList = () => (
    <Suspense
      fallback={ <CollectionProductsFallback /> }
    >
        <CollectionProducts />
    </Suspense>
);

const addProductList = (member) => {
    member.addItem(renderProductList, 'collection-products');
    return member;
};

export default {
    'ShopifyCollections/Component/CollectionPage/Component/CollectionPageComponent': {
        'member-property': {
            sortedRenderMap: addProductList
        }
    }
};
