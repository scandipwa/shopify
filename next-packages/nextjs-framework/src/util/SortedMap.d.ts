/* eslint-disable @scandipwa/scandipwa-guidelines/only-one-class,max-classes-per-file */
declare namespace NextJSFramework.Util {
    export type SortedListOptions = Record<string, unknown>

    /** @namespace NextjsFramework/Util/SortedMap/d/SortedList */
    export class SortedList {
        options: SortedListOptions;

        __construct(array: JSX.Element[], options?: SortedListOptions): void

        getSortedArray(): JSX.Element[]

        addItemToPosition(item: JSX.Element, position?: number): void
    }

    /** @namespace NextjsFramework/Util/SortedMap/d/SortedRenderList */
    export class SortedRenderList extends SortedList {
        _renderItem(item: JSX.Element, key: unknown): JSX.Element

        render(): JSX.Element[]
    }

    /** @namespace NextjsFramework/Util/SortedMap/d/createSortedRenderList */
    export const createSortedRenderList: (
        array?: JSX.Element[],
        options?: SortedListOptions
    ) => SortedRenderList;

    /** @namespace NextjsFramework/Util/SortedMap/d/createSortedList */
    export const createSortedList: (
        array?: JSX.Element[],
        options?: SortedListOptions
    ) => SortedList;
}

declare module '@scandipwa/nextjs-framework/src/util/SortedMap' {
    export import SortedList = NextJSFramework.Util.SortedList
    export import SortedRenderList = NextJSFramework.Util.SortedRenderList
    export import createSortedRenderList = NextJSFramework.Util.createSortedRenderList
    export import createSortedList = NextJSFramework.Util.createSortedList
}

export import SortedList = NextJSFramework.Util.SortedList
export import SortedRenderList = NextJSFramework.Util.SortedRenderList
export import createSortedRenderList = NextJSFramework.Util.createSortedRenderList
export import createSortedList = NextJSFramework.Util.createSortedList
