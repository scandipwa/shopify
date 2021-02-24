import NextPageContext from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import { withFallback } from '@scandipwa/shopify-nextjs-api/src/util/withFallback';
import { PureComponent } from 'react';

import PagePageComponent from './PagePage.component';

/** @namespace ShopifyNextjsPages/Component/PagePage/Container/PagePageContainer */
export class PagePageContainer extends PureComponent {
    static contextType = NextPageContext;

    renderPageComponent = () => {
        const { props: { page } } = this.context;
        return <PagePageComponent page={ page } />;
    };

    render() {
        return this.renderPageComponent();
    }
}

export default withFallback(PagePageContainer);
