import PaginatedConnection from '@scandipwa/shopify-nextjs-api/src/component/PaginatedConnection';
import { PureComponent } from 'react';

import { ProductsResponseType } from '../../api/Products.type';
import ProductCard from '../ProductCard';

/** @namespace ShopifyNextjsProducts/Component/ProductsPage/Component/ProductsPageComponent */
export class ProductsPageComponent extends PureComponent {
    static propTypes = {
        productsResponse: ProductsResponseType
    };

    static defaultProps = {
        productsResponse: null
    };

    renderCard = (product, i) => (
        <ProductCard
          product={ product }
          key={ i }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCard);

    renderContent = () => {
        const { productsResponse } = this.props;

        return (
            <PaginatedConnection
              paginatedResponse={ productsResponse }
              renderPage={ this.renderPage }
            />
        );
    };

    render() {
        return (
            <div className="ProductsPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default ProductsPageComponent;
