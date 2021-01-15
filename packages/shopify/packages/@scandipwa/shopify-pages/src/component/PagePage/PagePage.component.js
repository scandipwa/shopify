import { createSortedRenderList } from '@scandipwa/shopify-api/src/util/SortedMap';
import { PureComponent } from 'react';

import { PageType } from '../../api/Page.type';

/** @namespace ShopifyPages/Component/PagePage/Component/PagePageComponent */
export class PagePageComponent extends PureComponent {
    static propTypes = {
        page: PageType.isRequired
    };

    sortedRenderList = createSortedRenderList([
        this.renderTitle.bind(this),
        this.renderBody.bind(this)
    ]);

    renderBody() {
        const { page: { body } } = this.props;

        if (!body) {
            return null;
        }

        // TODO: use HTML component here
        return body;
        // return <div dangerouslySetInnerHTML={ body } />;
    }

    renderTitle() {
        const { page: { title } } = this.props;

        // TODO: use Typography component here
        return <h2>{ title }</h2>;
    }

    renderContent() {
        return this.renderBody();
    }

    render() {
        return (
            <div block="PagePage">
                { this.renderContent() }
            </div>
        );
    }
}

export default PagePageComponent;
