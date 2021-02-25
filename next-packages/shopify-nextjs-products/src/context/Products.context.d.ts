/// <reference types="react" />

declare namespace ShopifyNextJSProducts.Context {
    namespace ProductsContext {
        export interface ProductsType {
            product?: NextJSFramework.Context.NextPageContext.ProductType
        }
        export const ProductsContextType: React.Context<ProductsType>;
    }
}

declare module '@scandipwa/shopify-nextjs-products/src/context/Products.context' {
    export default ShopifyNextJSProducts.Context.ProductsContext.ProductsContextType;
}
