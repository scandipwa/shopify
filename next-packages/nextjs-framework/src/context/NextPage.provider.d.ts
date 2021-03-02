import React from 'react';

import { ProductType } from './NextPage.context';

declare module '@scandipwa/nextjs-framework/src/context/NextPage.provider' {
    export interface NextPageProviderProps {
        children: React.ReactNode
        product: ProductType
    }

    export interface NextPageProviderState {
        myOriginalState: string
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-namespace
    export class NextPageProvider extends React.PureComponent<NextPageProviderProps, NextPageProviderState> {
        getContextValue(): ProductType

        render(): JSX.Element
    }
}

export default NextPageProvider;
