import { PureComponent } from 'react';

import { createSortedList, createSortedRenderList } from '../../util/SortedMap';

/** @namespace Framework/Component/App/Component/AppComponent */
export class AppComponent extends PureComponent {
    rootComponentsRenderList = createSortedRenderList([]);

    contextProvidersRenderList = createSortedList([]);

    renderContextProviders() {
        return this.contextProvidersRenderList.getSortedArray().reduce(
            (acc, renderer) => renderer(acc),
            [this.rootComponentsRenderList.render()]
        );
    }

    render() {
        return this.renderContextProviders();
    }
}

export default AppComponent;
