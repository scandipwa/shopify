import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';

import { processPageByHandleResponse } from '../../api/Page.processor';
import getPageQueryOfType, { SINGLE_PAGE } from '../../api/Page.query';
import PageFallbackPage from '../PageFallbackPage';
import PagePageComponent from './PagePage.component';
import { PAGE_COMPONENT_PAGE, PAGE_FALLBACK_PAGE } from './PagePage.config';

/** @namespace ShopifyPages/Component/PagePage/Container/PagePageContainer */
export class PagePageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    getPageFromHistoryState() {
        const { history } = this.props;
        return history?.location?.state?.page;
    }

    getPageHandle() {
        const { match: { params: { handle } } } = this.props;
        return handle;
    }

    renderPagePlaceholder = () => {
        const Fallback = this._getComponentByKey(PAGE_FALLBACK_PAGE);
        return <Fallback />;
    };

    renderPageComponent = (node) => {
        const Component = this._getComponentByKey(PAGE_COMPONENT_PAGE);
        return <Component page={ node } />;
    };

    render() {
        return (
            <HandleConnection
              handle={ this.getPageHandle() }
              defaultNode={ this.getPageFromHistoryState() }
              renderNode={ this.renderPageComponent }
              renderNodePlaceholder={ this.renderPagePlaceholder }
              queryGetter={ getPageQueryOfType(SINGLE_PAGE) }
              responseProcessor={ processPageByHandleResponse }
            />
        );
    }
}

export default withHOC(PagePageContainer, {
    [PAGE_FALLBACK_PAGE]: PageFallbackPage,
    [PAGE_COMPONENT_PAGE]: PagePageComponent
});
