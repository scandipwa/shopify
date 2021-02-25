/// <reference types="react" />

declare namespace NextJSFramework.Context {
    namespace NextPageContext {
        export interface ProductType {
            id: string
            title: string
            description: string
            images: { src: string}[]
        }
        export interface NextPageType {
            props: {
                product?: ProductType
                responseData?: Record<string, unknown>
            }
        }
        export const nextPageContext: React.Context<NextPageType>;

    }
}

declare module '@scandipwa/nextjs-framework/src/context/NextPage.context' {
    export default NextJSFramework.Context.NextPageContext.nextPageContext;
}
