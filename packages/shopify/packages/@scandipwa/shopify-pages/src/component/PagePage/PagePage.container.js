import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';
import { PureComponent } from 'react';

import { processPageByHandleResponse } from '../../api/Page.processor';
import getPageQueryOfType, { SINGLE_PAGE } from '../../api/Page.query';
import PageFallbackPage from '../PageFallbackPage';
import PagePageComponent from './PagePage.component';

/** @namespace ShopifyPages/Component/PagePage/Container/PagePageContainer */
export class PagePageContainer extends PureComponent {
    static propTypes = {
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

    renderPagePlaceholder = () => (
        <PageFallbackPage />
    );

    renderPageComponent = (node) => (
        <PagePageComponent
          page={ node }
        />
    );

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

export default PagePageContainer;
