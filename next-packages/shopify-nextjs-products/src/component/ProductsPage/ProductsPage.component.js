import NextPageContext from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import PaginatedConnection from '@scandipwa/shopify-nextjs-api/src/component/PaginatedConnection';
import { PureComponent } from 'react';

import ProductCard from '../ProductCard';

/** @namespace ShopifyNextjsProducts/Component/ProductsPage/Component/ProductsPageComponent */
export class ProductsPageComponent extends PureComponent {
    static contextType = NextPageContext;

    renderCard = (product, i) => (
        <ProductCard
          product={ product }
          key={ i }
        />
    );

    renderPage = (nodes) => nodes.map(this.renderCard);

    renderContent = () => {
        const { props: { productsResponse } } = this.context;

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
