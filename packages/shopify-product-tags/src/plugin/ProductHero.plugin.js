import { createElement, lazy } from 'react';

const ProductTags = lazy(() => import('../component/ProductTags'));

const addProductTagsToHero = (member) => {
    member.addItem(() => createElement(ProductTags), 'productHeroTags');

    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderMap: addProductTagsToHero
        }
    }
};
