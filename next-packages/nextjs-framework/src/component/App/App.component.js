import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { createSortedList } from '../../util/SortedMap';

/** @namespace NextjsFramework/Component/App/Component/AppComponent */
export class AppComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    contextProvidersRenderList = createSortedList([]);

    renderContextProviders() {
        return this.contextProvidersRenderList.getSortedArray().reduce(
            (acc, renderer) => renderer(acc),
            [this.renderRootComponent()]
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
