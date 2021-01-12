import { Fragment, PureComponent } from 'react';

import { ProductType } from '../../api/Products.type';

/** @namespace ShopifyProducts/Component/ProductPage/Component/ProductPageComponent */
export class ProductPageComponent extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    renderMap = {
        image: this.renderMedia.bind(this),
        title: this.renderTitle.bind(this),
        descriptionHtml: this.renderDescription.bind(this)
    };

    renderDescription() {
        const { product: { descriptionHtml } } = this.props;

        // TODO: use HTML component here
        return descriptionHtml;
        // return <div dangerouslySetInnerHTML={ descriptionHtml } />;
    }

    renderMedia() {
        const { product: { image: { transformedSrc, altText } } } = this.props;

        // TODO: use Image component here
        return <img src={ transformedSrc } alt={ altText } />;
    }

    renderTitle() {
        const { product: { title } } = this.props;

        // TODO: use Typography component here
        return <h2>{ title }</h2>;
    }

    renderContentParts = ([key, render]) => {
        const { product } = this.props;

        if (!product[key]) {
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
            <div block="ProductPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default ProductPageComponent;
