/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */
/// <reference types="react" />

declare namespace ScandiPWA.NextJSFramework.Context.NextPage.Provider {
    export interface NextPageProviderProps {
        children: React.ReactNode
        product: ScandiPWA.NextJSFramework.Context.NextPage.
    }

    export interface NextPageProviderState {
        myOriginalState: string
    }

    export class NextPageProvider extends React.PureComponent<NextPageProviderProps, NextPageProviderState> {
        getContextValue(): ScandiPWA.NextJSFramework.Context.NextPage.ProductType

        render(): JSX.Element
    }
}

declare module '@scandipwa/nextjs-framework/src/context/NextPage.provider' {
    export import NextPageProvider = ScandiPWA.NextJSFramework.Context.NextPage.Provider.NextPageProvider
    export default ScandiPWA.NextJSFramework.Context.NextPage.Provider.NextPageProvider;
}
