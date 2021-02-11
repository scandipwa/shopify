import { createSortedRenderList } from '@scandipwa/nextjs-framework/src/util/SortedMap';
import { ResponseDataType } from '@scandipwa/shopify-nextjs-api/src/api/types';

import { PageType } from '../../api/Page.type';
import { PagePageComponent } from '../PagePage/PagePage.component';

/** @namespace ShopifyNextjsPages/Component/FrontPagePage/Component/FrontPagePageComponent */
export class FrontPagePageComponent extends PagePageComponent {
    static propTypes = {
        page: PageType,
        responseData: ResponseDataType
    };

    sortedRenderList = createSortedRenderList([
        this.renderBody.bind(this)
    ]);

    renderDefaultFrontpage() {
        return 'default frontpage!';
    }

    render() {
        const { page, responseData: { errorCode } } = this.props;

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
