import { ProductType } from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import React from 'react';

declare module '@scandipwa/shopify-nextjs-products/src/context/Products.provider' {
    interface ProductProviderProps {
        product: ProductType
    }

    interface ProductProviderState {
        myOriginalState: string
    }

    class ProductsProvider extends React.PureComponent<ProductProviderProps, ProductProviderState> {
        getContextValue(): ProductType

        render(): JSX.Element
    }
}

export default ProductsProvider;
