import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { createSortedRenderMap } from '../../util/SortedMap';

/** @namespace NextjsFramework/Component/App/Component/AppComponent */
export class AppComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    contextProvidersRenderList = createSortedRenderMap({});

    renderContextProviders() {
        return Array.from(this.contextProvidersRenderList.getSortedMap(), ([, { item }]) => item).reduce(
            (acc, renderer) => renderer(acc),
            [this.rootComponentsRenderList.render()]
        );
    }

    renderRootComponent() {
        const { children } = this.props;
        return children;
    }

    render() {
        return this.renderContextProviders();
    }
}

export default AppComponent;
