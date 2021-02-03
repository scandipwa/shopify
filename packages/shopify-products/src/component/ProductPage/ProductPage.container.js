import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';

import { processProductByHandleResponse } from '../../api/Products.processor';
import getProductsQueryOfType, { SINGLE_PRODUCT } from '../../api/Products.query';
import ProductProvider from '../../context/Products.provider';
import ProductFallbackPage from '../ProductFallbackPage';
import { PRODUCT_COMPONENT_PAGE, PRODUCT_FALLBACK_PAGE } from './PagePage.config';
import ProductPageComponent from './ProductPage.component';

/** @namespace ShopifyProducts/Component/ProductPage/Container/ProductPageContainer */
export class ProductPageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
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
        <ProductProvider product={ node }>
            { this.renderProductComponent() }
        </ProductProvider>
    );

    renderProductPlaceholder = () => {
        const Fallback = this._getComponentByKey(PRODUCT_FALLBACK_PAGE);
        return <Fallback />;
    };

    renderProductComponent = () => {
        const Component = this._getComponentByKey(PRODUCT_COMPONENT_PAGE);
        return <Component />;
    };

    render() {
        return (
            <HandleConnection
              queryArgs={ { handle: this.getProductHandle() } }
              defaultNode={ this.getProductFromHistoryState() }
              renderNode={ this.renderProductProvider }
              renderNodePlaceholder={ this.renderProductPlaceholder }
              queryGetter={ getProductsQueryOfType(SINGLE_PRODUCT) }
              responseProcessor={ processProductByHandleResponse }

            />
        );
    }
}

export default withHOC(ProductPageContainer, {
    [PRODUCT_FALLBACK_PAGE]: ProductFallbackPage,
    [PRODUCT_COMPONENT_PAGE]: ProductPageComponent
});
