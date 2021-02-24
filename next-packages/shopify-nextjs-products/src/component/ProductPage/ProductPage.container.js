import NextPageContext from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import { withFallback } from '@scandipwa/shopify-nextjs-api/src/util/withFallback';
import { PureComponent } from 'react';

import ProductProvider from '../../context/Products.provider';
import ProductPageComponent from './ProductPage.component';

/** @namespace ShopifyNextjsProducts/Component/ProductPage/Container/ProductPageContainer */
export class ProductPageContainer extends PureComponent {
    static contextType = NextPageContext;

    renderProductProvider = () => {
        const { props: { product } } = this.context;

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
