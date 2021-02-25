/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */
/// <reference types="react" />

interface ProductSelectedOption {
    name: string
    value: string
}
interface ProductVariantType {
    id: string
    image: {id:string}
    selectedOptions: ProductSelectedOption[]
}

declare namespace ShopifyNextJSProducts.Context.ProductsProvider {
    interface ProductProviderState {
        isHasOptions: boolean
        isHasOnlyOneVariant: boolean
        selectedVariant?: ProductVariantType
        selectedOptions?: Record<string, string>
    }
}
