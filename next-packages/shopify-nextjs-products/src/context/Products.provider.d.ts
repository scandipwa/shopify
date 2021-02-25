/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */
/// <reference types="react" />

declare namespace ShopifyNextJSProducts.Context {
    namespace ProductsProvider {
        export interface ProductProviderProps {
            children: React.ReactNode
            product: NextJSFramework.Context.NextPageContext.ProductType
        }

        export interface ProductProviderState {
            myOriginalState: string
        }

        export class ProductsProvider extends React.PureComponent<ProductProviderProps, ProductProviderState> {
            getContextValue(): NextJSFramework.Context.NextPageContext.ProductType

            render(): JSX.Element
        }
    }
}

declare module '@scandipwa/shopify-nextjs-products/src/context/Products.provider' {
    export import ProductsProvider = ShopifyNextJSProducts.Context.ProductsProvider.ProductsProvider
    export default ShopifyNextJSProducts.Context.ProductsProvider.ProductsProvider;
}
