import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';
import { PureComponent } from 'react';

import { processProductByHandleResponse } from '../../api/Products.processor';
import getProductsQueryOfType, { SINGLE_PRODUCT } from '../../api/Products.query';
import ProductContext, { Product } from '../../product';
import ProductFallbackPage from '../ProductFallbackPage';
import ProductPageComponent from './ProductPage.component';

/** @namespace ShopifyProducts/Component/ProductPage/Container/ProductPageContainer */
export class ProductPageContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    getProductFromHistoryState() {
        const { history } = this.props;
        return history?.location?.state?.product;
    }

    getProductHandle() {
        const { match: { params: { handle } } } = this.props;
        return handle;
    }

    renderProductProvider = (node) => (
        <ProductContext.Provider value={ new Product(node) }>
            { this.renderProductComponent() }
        </ProductContext.Provider>
    );

    renderProductComponent = () => (
        <ProductPageComponent />
    );

    renderProductPlaceholder = () => (
        <ProductFallbackPage />
    );

    render() {
        return (
            <HandleConnection
              handle={ this.getProductHandle() }
              defaultNode={ this.getProductFromHistoryState() }
              renderNode={ this.renderProductProvider }
              renderNodePlaceholder={ this.renderProductPlaceholder }
              queryGetter={ getProductsQueryOfType(SINGLE_PRODUCT) }
              responseProcessor={ processProductByHandleResponse }
            />
        );
    }
}

export default ProductPageContainer;
