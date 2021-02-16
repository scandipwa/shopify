import { withFallback } from '@scandipwa/shopify-nextjs-api/src/util/withFallback';
import { PureComponent } from 'react';

import { ProductType } from '../../api/Products.type';
import ProductProvider from '../../context/Products.provider';
import ProductPageComponent from './ProductPage.component';

/** @namespace ShopifyNextjsProducts/Component/ProductPage/Container/ProductPageContainer */
export class ProductPageContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    renderProductProvider = () => {
        const { product } = this.props;

        return (
            <ProductProvider product={ product }>
                { this.renderProductComponent() }
            </ProductProvider>
        );
    };

    renderProductComponent() {
        return <ProductPageComponent />;
    }

    render() {
        return this.renderProductProvider();
    }
}

export default withFallback(ProductPageContainer);
