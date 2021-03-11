import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';

import { PagePageComponent } from '../PagePage/PagePage.component';

/** @namespace ShopifyPages/Component/FrontPagePage/Component/FrontPagePageComponent */
export class FrontPagePageComponent extends PagePageComponent {
    sortedRenderMap = createSortedRenderMap({
        frontPageBody: this.renderBody.bind(this)
    });

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
