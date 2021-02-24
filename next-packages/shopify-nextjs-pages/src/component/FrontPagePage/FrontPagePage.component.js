import NextPageContext from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import { createSortedRenderList } from '@scandipwa/nextjs-framework/src/util/SortedMap';

import { PagePageComponent } from '../PagePage/PagePage.component';

/** @namespace ShopifyNextjsPages/Component/FrontPagePage/Component/FrontPagePageComponent */
export class FrontPagePageComponent extends PagePageComponent {
    static contextType = NextPageContext;

    sortedRenderList = createSortedRenderList([
        this.renderBody.bind(this)
    ]);

    renderDefaultFrontpage() {
        return 'default frontpage!';
    }

    render() {
        const { props: { page, responseData: { errorCode } } } = this.context;

        if (!page || errorCode) {
            return this.renderDefaultFrontpage();
        }

        return (
            <div block="FrontPagePage">
                { this.renderContent() }
            </div>
        );
    }
}

export default FrontPagePageComponent;
