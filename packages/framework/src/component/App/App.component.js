import { PureComponent } from 'react';

import { createSortedMap, createSortedRenderMap } from '../../util/SortedMap';

/** @namespace Framework/Component/App/Component/AppComponent */
export class AppComponent extends PureComponent {
    rootComponentsRenderList = createSortedRenderMap({});

    contextProvidersRenderList = createSortedMap({});

    renderContextProviders() {
        return Array.from(this.contextProvidersRenderList.getSortedMap(), ([, { item }]) => item).reduce(
            (acc, renderer) => renderer(acc),
            [this.rootComponentsRenderList.render()]
        );
    }

    render() {
        return this.renderContextProviders();
    }
}

export default AppComponent;
