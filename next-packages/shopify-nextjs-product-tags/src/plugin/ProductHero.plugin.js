import dynamic from 'next/dynamic';
import { createElement } from 'react';

const ProductTags = dynamic(() => import('../component/ProductTags'));

const addProductTagsToHero = (member) => {
    member.addItemToPosition(() => createElement(ProductTags));

    return member;
};

export default {
    'ShopifyNextjsProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addProductTagsToHero
        }
    }
};
