import { HigherOrderComponent, withHOC } from '@scandipwa/nextjs-framework/src/util/HOC';
import DefaultFallback from 'next/error';

import { PageType } from '../../api/Page.type';
import PagePageComponent from './PagePage.component';
import { PAGE_COMPONENT, PAGE_FALLBACK } from './PagePage.config';

/** @namespace ShopifyNextjsPages/Component/PagePage/Container/PagePageContainer */
export class PagePageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        page: PageType
    };

    static defaultProps = {
        page: null
    };

    renderPageComponent = () => {
        const { page } = this.props;
        const Component = this._getComponentByKey(PAGE_COMPONENT);
        return <Component page={ page } />;
    };

    renderPageFallback = () => {
        const Fallback = this._getComponentByKey(PAGE_FALLBACK);
        return <Fallback statusCode={ 404 } />;
    };

    render() {
        const { page } = this.props;

        if (!page) {
            return this.renderPageFallback();
        }

        return this.renderPageComponent();
    }
}

export default withHOC(PagePageContainer, {
    [PAGE_COMPONENT]: PagePageComponent,
    [PAGE_FALLBACK]: DefaultFallback
});
