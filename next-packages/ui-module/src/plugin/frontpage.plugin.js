// eslint-disable-next-line simple-import-sort/sort
import React from 'react';
import { StyleGuideComponent } from '../component/StyleGuide';

const addStyleGuideRender = (member) => {
    const PRICE_POSITION = 1500;
    // TODO: use Suspense here
    member.addItemToPosition(() => React.createElement(StyleGuideComponent), PRICE_POSITION);
    return member;
};

export default {
    'ShopifyNextjsPages/Component/FrontPagePage/Component/FrontPagePageComponent': {
        'member-property': {
            sortedRenderList: addStyleGuideRender
        },
        'member-function': {
            renderDefaultFrontpage: () => (<StyleGuideComponent />)
        }
    }
};
