import { ProductType } from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import React from 'react';

declare module '@scandipwa/shopify-nextjs-products/src/context/Products.context' {
    export interface ProductsType {
        product?: ProductType
    }
    export const ProductsContextType: React.Context<ProductsType>;
}

export default ProductsContextType;
