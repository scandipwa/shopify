import { createElement } from 'react';

import Router from '../component/Router';

const addRouterRootComponent = (member) => {
    const ROUTER_POSITION = 1000;
    member.addItem(() => createElement(Router), 'appRouterRoot', ROUTER_POSITION);
    return member;
};

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            rootComponentsRenderList: addRouterRootComponent
        }
    }
};
