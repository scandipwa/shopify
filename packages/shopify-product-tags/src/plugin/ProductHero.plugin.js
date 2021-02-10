import { createElement, lazy } from 'react';

const ProductTags = lazy(() => import('../component/ProductTags'));

const addProductTagsToHero = (member) => {
    member.addItemToPosition(() => createElement(ProductTags));

    return member;
};

export default {
    'ShopifyProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addProductTagsToHero
        }
    }
};
