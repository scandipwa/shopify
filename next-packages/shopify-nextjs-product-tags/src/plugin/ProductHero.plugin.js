import dynamic from 'next/dynamic';
import { createElement } from 'react';

const ProductTags = dynamic(() => import('../component/ProductTags'));

const addProductTagsToHero = (member) => {
    member.addItem(() => createElement(ProductTags), 'productHeroTags');

    return member;
};

export default {
    'ShopifyNextjsProducts/Component/ProductHero/Component/ProductHeroComponent': {
        'member-property': {
            sortedRenderList: addProductTagsToHero
        }
    }
};
