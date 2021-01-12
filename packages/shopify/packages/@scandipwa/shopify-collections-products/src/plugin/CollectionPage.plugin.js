import { lazy, Suspense } from 'react';

import CollectionProductsFallback from '../component/CollectionProductsFallback';

const CollectionProducts = lazy(() => import('../component/CollectionProducts'));

const renderProductList = () => (
    <Suspense
      key="collection-products"
      fallback={ <CollectionProductsFallback /> }
    >
        <CollectionProducts />
    </Suspense>
);

const afterRenderContent = (args, callback) => [
    callback(...args),
    renderProductList()
];

export default {
    'ShopifyCollections/Component/CollectionPage/Component/CollectionPageComponent': {
        'member-function': {
            renderContent: afterRenderContent
        }
    }
};
