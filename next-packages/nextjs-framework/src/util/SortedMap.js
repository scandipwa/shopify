/* eslint-disable max-classes-per-file, @scandipwa/scandipwa-guidelines/only-one-class, no-param-reassign */

import { cloneElement, Fragment, isValidElement } from 'react';

export const DEFAULT_POSITION = 1000;

/** @namespace NextjsFramework/Util/SortedMap/SortedList */
export class SortedList {
    __construct(array, options = {}) {
        this.options = options;

        this._unsortedArray = array.map((item, i) => ({
            item,
            // start position with 1000
            position: (i + 1) * DEFAULT_POSITION
        }));
    }

    getSortedArray = () => this._unsortedArray.sort(
        (a, b) => a.position - b.position
    ).map(
        ({ item }) => item
    );

    addItemToPosition = (item, position = DEFAULT_POSITION) => {
        this._unsortedArray.push({ position, item });
    };
}

/** @namespace NextjsFramework/Util/SortedMap/SortedRenderList */
export class SortedRenderList extends SortedList {
    _renderItem(item, key) {
        const child = item();

        if (!isValidElement(child)) {
            return (
                <Fragment key={ key }>
                    { child }
                </Fragment>
            );
        }

        return cloneElement(child, { key });
    }

    render = () => {
        const { renderItem = this._renderItem } = this.options;
        return this.getSortedArray().map(renderItem);
    };
}

/** @namespace NextjsFramework/Util/SortedMap/createSortedRenderList */
export const createSortedRenderList = (array = [], options) => new SortedRenderList(array, options);

/** @namespace NextjsFramework/Util/SortedMap/createSortedList */
export const createSortedList = (array = [], options) => new SortedList(array, options);
