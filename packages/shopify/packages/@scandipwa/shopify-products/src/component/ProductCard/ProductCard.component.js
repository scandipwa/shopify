import { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { ProductType } from '../../api/Products.type';

/** @namespace ShopifyProducts/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    renderMap = {
        image: this.renderMedia.bind(this),
        title: this.renderTitle.bind(this),
        description: this.renderDescription.bind(this)
    };

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

    renderDescription() {
        const { product: { description } } = this.props;

        // TODO: use Typography component here
        return <p>{ description }</p>;
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

    renderLink() {
        const { product: { linkTo } } = this.props;

        return (
            <Link to={ linkTo } block="ProductCard">
                { this.renderContent() }
            </Link>
        );
    }

    render() {
        return this.renderLink();
    }
}

export default ProductCardComponent;
