import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';
import PropTypes from 'prop-types';

import { processPageByHandleResponse } from '../../api/Page.processor';
import getPageQueryOfType, { SINGLE_PAGE } from '../../api/Page.query';
import { PageType } from '../../api/Page.type';
import PageFallbackPage from '../PageFallbackPage';
import PagePageComponent from './PagePage.component';
import { PAGE_COMPONENT_PAGE, PAGE_FALLBACK_PAGE } from './PagePage.config';

/** @namespace ShopifyPages/Component/PagePage/Container/PagePageContainer */
export class PagePageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        handle: PropTypes.string,
        cachedPage: PageType
    };

    static defaultProps = {
        cachedPage: {},
        handle: ''
    };

    getPageFromHistoryState() {
        const { cachedPage } = this.props;
        return cachedPage;
    }

    getQueryArgs() {
        const { match: { params: { handle } } } = this.props;
        return {
            handle
        };
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
              queryArgs={ this.getQueryArgs() }
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
