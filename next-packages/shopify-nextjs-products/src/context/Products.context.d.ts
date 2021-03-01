/// <reference types="react" />

ScandiPWA.NextJSFramework
declare namespace ScandiPWA.ShopifyNextJSProducts.Context.Products {
    export interface ProductsType {
        product?: ScandiPWA.NextJSFramework.Context.NextPage.ProductType
    }
    export const ProductsContextType: React.Context<ProductsType>;
}

declare module '@scandipwa/shopify-nextjs-products/src/context/Products.context' {
    export default ScandiPWA.ShopifyNextJSProducts.Context.Products.ProductsContextType;
}
