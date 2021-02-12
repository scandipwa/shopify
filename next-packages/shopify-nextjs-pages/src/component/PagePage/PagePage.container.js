import { HigherOrderComponent, withHOC } from '@scandipwa/nextjs-framework/src/util/HOC';
import { ResponseDataType } from '@scandipwa/shopify-nextjs-api/src/api/types';
import DefaultFallback from 'next/error';

import { PageType } from '../../api/Page.type';
import PagePageComponent from './PagePage.component';
import { PAGE_COMPONENT, PAGE_FALLBACK } from './PagePage.config';

/** @namespace ShopifyNextjsPages/Component/PagePage/Container/PagePageContainer */
export class PagePageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        page: PageType,
        responseData: ResponseDataType
    };

    static defaultProps = {
        page: null
    };

    renderPageComponent = () => {
        const { page } = this.props;
        const Component = this._getComponentByKey(PAGE_COMPONENT);
        return <Component page={ page } />;
    };

    renderPageFallback = (errorCode) => {
        const Fallback = this._getComponentByKey(PAGE_FALLBACK);
        return <Fallback statusCode={ errorCode } />;
    };

    render() {
        const { page, responseData: { errorCode } } = this.props;

        if (!page || errorCode) {
            return this.renderPageFallback(errorCode);
        }

        return this.renderPageComponent();
    }
}

export default withHOC(PagePageContainer, {
    [PAGE_COMPONENT]: PagePageComponent,
    [PAGE_FALLBACK]: DefaultFallback
});
