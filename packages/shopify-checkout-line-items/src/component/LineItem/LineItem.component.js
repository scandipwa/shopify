import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import LineItemsContext from '../../context/LineItems.context';
import LineItemPrice from '../LineItemPrice';
import LineItemQuantity from '../LineItemQuantity';

/**
 * Line Item component
 * @namespace ShopifyCheckoutLineItems/Component/LineItem/Component/LineItemComponent */
export class LineItemComponent extends PureComponent {
    static contextType = LineItemsContext;

    /**
     * The list of elements to be displayed in the line item block
     * @extPoint Display new element in the line items block
     * @extExample (member, instance) => {
     *      member.addItem(() => <MyCartSection />, 'someKey');
     *      return member;
     * }
     */
    sortedRenderMap = createSortedRenderMap({
        lineItemDelete: this.renderDelete.bind(this),
        lineItemImage: this.renderImage.bind(this),
        lineItemTitle: this.renderTitle.bind(this),
        lineItemPrice: this.renderPrice.bind(this),
        lineItemQuantity: this.renderQuantity.bind(this)
    });

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
        return this.sortedRenderMap.render();
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
