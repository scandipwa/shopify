import { createSortedRenderList } from '@scandipwa/shopify-api/src/util/SortedMap';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import LineItemsContext from '../../context/LineItems.context';
import LineItemPrice from '../LineItemPrice';
import LineItemQuantity from '../LineItemQuantity';

/** @namespace ShopifyCheckout-Cart/Component/LineItem/Component/LineItemComponent */
export class LineItemComponent extends PureComponent {
    static contextType = LineItemsContext;

    sortedRenderList = createSortedRenderList([
        this.renderDelete.bind(this),
        this.renderImage.bind(this),
        this.renderTitle.bind(this),
        this.renderPrice.bind(this),
        this.renderQuantity.bind(this)
    ]);

    renderDelete() {
        const { remove } = this.context;

        return (
            <button onClick={ remove }>
                Delete
            </button>
        );
    }

    renderQuantity() {
        return (
            <LineItemQuantity />
        );
    }

    renderImage() {
        const { product: { images: [{ src, alt }] = [] } } = this.context;

        if (!src) {
            return null;
        }

        // TODO: use Image component here
        return <img src={ src } alt={ alt } />;
    }

    renderPrice() {
        return (
            <LineItemPrice />
        );
    }

    renderTitle() {
        const { product: { title, linkTo } } = this.context;

        if (!title) {
            return null;
        }

        // TODO: use Typography component here
        return (
            <Link to={ linkTo } block="LineItem">
                <h2>{ title }</h2>
            </Link>
        );
    }

    renderContent() {
        return this.sortedRenderList.render();
    }

    render() {
        return (
            <div block="LineItem">
                { this.renderContent() }
            </div>
        );
    }
}

export default LineItemComponent;
