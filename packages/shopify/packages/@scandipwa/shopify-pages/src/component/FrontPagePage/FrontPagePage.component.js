import { Fragment, PureComponent } from 'react';

import { PageType } from '../../api/Page.type';

/** @namespace ShopifyPages/Component/FrontPagePage/Component/FrontPagePageComponent */
export class FrontPagePageComponent extends PureComponent {
    static propTypes = {
        page: PageType.isRequired
    };

    renderMap = {
        body: this.renderBody.bind(this)
    };

    renderBody() {
        const { page: { body } } = this.props;

        // TODO: use HTML component here
        return body;
        // return <div dangerouslySetInnerHTML={ body } />;
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
