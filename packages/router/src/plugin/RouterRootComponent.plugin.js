import { createElement } from 'react';

import Router from '../component/Router';

const addRouterRootComponent = (member) => {
    const ROUTER_POSITION = 1000;
    member.addItemToPosition(() => createElement(Router), ROUTER_POSITION);
    return member;
};

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            rootComponentsRenderList: addRouterRootComponent
        }
    }
};
