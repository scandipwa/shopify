import { createSortedRenderList } from '@scandipwa/nextjs-framework/src/util/SortedMap';

import { PageType } from '../../api/Page.type';
import { PagePageComponent } from '../PagePage/PagePage.component';

/** @namespace ShopifyNextjsPages/Component/FrontPagePage/Component/FrontPagePageComponent */
export class FrontPagePageComponent extends PagePageComponent {
    static propTypes = {
        page: PageType
    };

    sortedRenderList = createSortedRenderList([
        this.renderBody.bind(this)
    ]);

    renderDefaultFrontpage() {
        return 'default frontpage!';
    }

    render() {
        const { page } = this.props;

        if (!page) {
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
