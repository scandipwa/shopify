import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';

import { processPageByHandleResponse } from '../../api/Page.processor';
import PageQuery from '../../api/Page.query';
import FrontPageFallbackPage from '../FrontPageFallbackPage';
import { PagePageContainer } from '../PagePage/PagePage.container';
import FrontPagePageComponent from './FrontPagePage.component';
import { FRONT_PAGE_HANDLE } from './FrontPagePage.config';

/** @namespace ShopifyPages/Component/FrontPagePage/Container/FrontPagePageContainer */
export class FrontPagePageContainer extends PagePageContainer {
    getPageFromHistoryState() {
        return undefined;
    }

    getPageHandle() {
        return FRONT_PAGE_HANDLE;
    }

    renderPagePlaceholder = () => (
        <FrontPageFallbackPage />
    );

    renderPageComponent = (node) => (
        <FrontPagePageComponent
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
              queryGetter={ PageQuery.getPageByHandleField }
              responseProcessor={ processPageByHandleResponse }
            />
        );
    }
}

export default FrontPagePageContainer;
