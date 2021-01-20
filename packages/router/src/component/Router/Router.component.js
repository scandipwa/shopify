import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
import { createBrowserHistory } from 'history';
import { PureComponent } from 'react';
import { Router as ReactRouter } from 'react-router';
import { Switch } from 'react-router-dom';

export const history = createBrowserHistory({ basename: '/' });

/** @namespace Router/Component/Router/Component/RouterComponent */
export class RouterComponent extends PureComponent {
    static propTypes = {
    };

    _beforeSwitchRenderList = createSortedRenderList([]);

    _switchRenderList = createSortedRenderList([], {
        renderItem: this.renderRoute.bind(this)
    });

    _afterSwitchRenderList = createSortedRenderList([]);

    contentRenderList = createSortedRenderList([
        this._beforeSwitchRenderList.render,
        this.renderSwitch.bind(this),
        this._afterSwitchRenderList.render
    ]);

    renderRoute({ renderer }) {
        return renderer();
    }

    renderSwitch() {
        return (
            <Switch>
                { this._switchRenderList.render() }
            </Switch>
        );
    }

    renderRouterContent() {
        return this.contentRenderList.render();
    }

    render() {
        return (
            <ReactRouter history={ history }>
                { this.renderRouterContent() }
            </ReactRouter>
        );
    }
}

export default RouterComponent;
