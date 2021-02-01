import { withHOC } from '@scandipwa/nextjs-framework/src/util/HOC';

import FrontPageFallbackPage from '../FrontPageFallbackPage';
import { PAGE_COMPONENT_PAGE, PAGE_FALLBACK_PAGE } from '../PagePage/PagePage.config';
import { PagePageContainer } from '../PagePage/PagePage.container';
import FrontPagePageComponent from './FrontPagePage.component';
import { FRONT_PAGE_HANDLE } from './FrontPagePage.config';

/** @namespace ShopifyNextjsPages/Component/FrontPagePage/Container/FrontPagePageContainer */
export class FrontPagePageContainer extends PagePageContainer {
    getPageFromHistoryState() {
        return undefined;
    }

    getPageHandle() {
        return FRONT_PAGE_HANDLE;
    }
}

export default withHOC(FrontPagePageContainer, {
    [PAGE_FALLBACK_PAGE]: FrontPageFallbackPage,
    [PAGE_COMPONENT_PAGE]: FrontPagePageComponent
});
