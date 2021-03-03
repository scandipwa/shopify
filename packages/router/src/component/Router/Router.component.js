import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { createBrowserHistory } from 'history';
import { PureComponent } from 'react';
import { Router as ReactRouter } from 'react-router';
import { Switch } from 'react-router-dom';

export const history = createBrowserHistory({ basename: '/' });

/** @namespace Router/Component/Router/Component/RouterComponent */
export class RouterComponent extends PureComponent {
    static propTypes = {
    };

    _beforeSwitchRenderList = createSortedRenderMap({});

    _switchRenderList = createSortedRenderMap({});

    _afterSwitchRenderList = createSortedRenderMap({});

    contentRenderList = createSortedRenderMap({
        routerBeforeSwitch: this._beforeSwitchRenderList.render,
        routerRenderSwitch: this.renderSwitch.bind(this),
        routerAfterSwitch: this._afterSwitchRenderList.render
    });

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
