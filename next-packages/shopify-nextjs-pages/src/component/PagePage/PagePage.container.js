import { withFallback } from '@scandipwa/shopify-nextjs-api/src/util/withFallback';
import { PureComponent } from 'react';

import { PageType } from '../../api/Page.type';
import PagePageComponent from './PagePage.component';

/** @namespace ShopifyNextjsPages/Component/PagePage/Container/PagePageContainer */
export class PagePageContainer extends PureComponent {
    static propTypes = {
        page: PageType
    };

    static defaultProps = {
        page: null
    };

    renderPageComponent = () => {
        const { page } = this.props;
        return <PagePageComponent page={ page } />;
    };

    render() {
        return this.renderPageComponent();
    }
}

export default withFallback(PagePageContainer);
