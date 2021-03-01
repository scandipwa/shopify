/// <reference types="react" />

declare namespace ScandiPWA.ShopifyNextJSProducts.Context.Provider {
    interface ProductProviderProps {
        product: ScandiPWA.NextJSFramework.Context.NextPage.ProductType
    }

    interface ProductProviderState {
        myOriginalState: string
    }

    class ProductsProvider extends React.PureComponent<ProductProviderProps, ProductProviderState> {
        getContextValue(): ScandiPWA.NextJSFramework.Context.NextPage.ProductType

        render(): JSX.Element
    }
}

declare module '@scandipwa/shopify-nextjs-products/src/context/Products.provider' {
    export import ProductsProvider = ScandiPWA.ShopifyNextJSProducts.Context.Provider.ProductsProvider;

    export default ProductsProvider;
}

// export import ProductsProvider = ScandiPWA.ShopifyNextJSProducts.Context.Provider.ProductsProvider;

// export default ProductsProvider;
