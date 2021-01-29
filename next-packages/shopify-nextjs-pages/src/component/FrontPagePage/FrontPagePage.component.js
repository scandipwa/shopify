import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';

import { PagePageComponent } from '../PagePage/PagePage.component';

console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
console.log(ScandiPlugins);
console.log(middleware);
console.log(Extensible);
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

/** @namespace ShopifyNextjsPages/Component/FrontPagePage/Component/FrontPagePageComponent */
export class FrontPagePageComponent extends PagePageComponent {
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
