/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */
/// <reference types="react" />

declare namespace NextJSFramework.Context {
    namespace NextPageProvider {
        export interface NextPageProviderProps {
            children: React.ReactNode
            product: NextJSFramework.Context.NextPageContext.ProductType
        }

        export interface NextPageProviderState {
            myOriginalState: string
        }

        export class NextPageProvider extends React.PureComponent<NextPageProviderProps, NextPageProviderState> {
            getContextValue(): NextJSFramework.Context.NextPageContext.ProductType

            render(): JSX.Element
        }
    }
}

declare module '@scandipwa/nextjs-framework/src/context/NextPage.provider' {
    export import NextPageProvider = ShopifyNextJSProducts.Context.ProductsProvider.ProductsProvider
    export default NextJSFramework.Context.NextPageProvider.NextPageProvider;
}
