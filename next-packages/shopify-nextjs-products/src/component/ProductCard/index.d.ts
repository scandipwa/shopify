declare module '@scandipwa/some-package-name/src/component/First/First.component' {
    // now, define what is inside this module and what this module exports
        export interface FirstComponentProps {
            product: NextJSFramework.Context.NextPageContext.ProductType
        }

        export interface FirstComponentState {
            someState: string
        }

        /** @namespace ShopifyNextjsProducts/Component/ProductCard/Index/d/FirstComponent */
        export class FirstComponent extends React.PureComponent<ProductProviderProps, ProductProviderState> {
            getSomeDataMethod(): SomeDataTypeReturnedByMethod

            render(): JSX.Element
        }
        export default FirstComponent;
}
