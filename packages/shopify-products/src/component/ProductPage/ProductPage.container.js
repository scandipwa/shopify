import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';

import { requestProductByHandle } from '../../api/Product.request';
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

    __construct(props) {
        super.__construct(props);

        this.state = {
            product: null
        };
    }

    componentDidMount() {
        this.requestProduct();
    }

    async requestProduct() {
        const handle = this.getProductHandle();
        const product = await requestProductByHandle(handle);

        this.setState({ product });
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
        const { product } = this.state;

        return product
            ? this.renderProductProvider(product)
            : this.renderProductPlaceholder();
    }
}

export default withHOC(ProductPageContainer, {
    [PRODUCT_FALLBACK_PAGE]: ProductFallbackPage,
    [PRODUCT_COMPONENT_PAGE]: ProductPageComponent
});
