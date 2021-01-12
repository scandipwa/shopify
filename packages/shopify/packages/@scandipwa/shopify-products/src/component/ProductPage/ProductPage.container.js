import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';
import { PureComponent } from 'react';

import { processProductByHandleResponse } from '../../api/Products.processor';
import ProductsQuery from '../../api/Products.query';
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

    renderProductComponent = (node) => (
        <ProductPageComponent
          product={ node }
        />
    );

    renderProductPlaceholder = () => (
        <ProductFallbackPage />
    );

    render() {
        return (
            <HandleConnection
              handle={ this.getProductHandle() }
              defaultNode={ this.getProductFromHistoryState() }
              renderNode={ this.renderProductComponent }
              renderNodePlaceholder={ this.renderProductPlaceholder }
              queryGetter={ ProductsQuery.getProductByHandleField }
              responseProcessor={ processProductByHandleResponse }
            />
        );
    }
}

export default ProductPageContainer;
