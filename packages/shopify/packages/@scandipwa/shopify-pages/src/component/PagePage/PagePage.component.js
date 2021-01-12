import { Fragment, PureComponent } from 'react';

import { PageType } from '../../api/Page.type';

/** @namespace ShopifyPages/Component/PagePage/Component/PagePageComponent */
export class PagePageComponent extends PureComponent {
    static propTypes = {
        page: PageType.isRequired
    };

    renderMap = {
        title: this.renderTitle.bind(this),
        body: this.renderBody.bind(this)
    };

    renderBody() {
        const { page: { body } } = this.props;

        // TODO: use HTML component here
        return body;
        // return <div dangerouslySetInnerHTML={ body } />;
    }

    renderTitle() {
        const { page: { title } } = this.props;

        // TODO: use Typography component here
        return <h2>{ title }</h2>;
    }

    renderContentParts = ([key, render]) => {
        const { page } = this.props;

        if (!page[key]) {
            return null;
        }

        return (
            <Fragment key={ key }>
                { render() }
            </Fragment>
        );
    };

    renderContent() {
        return Object.entries(this.renderMap).map(this.renderContentParts);
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
