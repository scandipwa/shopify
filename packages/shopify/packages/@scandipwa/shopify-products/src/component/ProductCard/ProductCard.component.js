import { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { ProductType } from '../../api/Products.type';

/** @namespace ShopifyProducts/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    contentList = [
        this.renderMedia.bind(this),
        this.renderTitle.bind(this),
        this.renderDescription.bind(this)
    ];

    renderMedia() {
        const { product: { images: [{ src, alt }] = [] } } = this.props;

        if (!src) {
            return null;
        }

        // TODO: use Image component here
        return <img src={ src } alt={ alt } />;
    }

    renderTitle() {
        const { product: { title } } = this.props;

        if (!title) {
            return null;
        }

        // TODO: use Typography component here
        return <h2>{ title }</h2>;
    }

    renderDescription() {
        const { product: { description } } = this.props;

        if (!description) {
            return null;
        }

        // TODO: use Typography component here
        return <p>{ description }</p>;
    }

    renderContentPart = (render, i) => (
        <Fragment key={ i }>
            { render() }
        </Fragment>
    );

    renderContent() {
        return this.contentList.map(this.renderContentPart);
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
