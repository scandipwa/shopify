/* eslint-disable max-classes-per-file, @scandipwa/scandipwa-guidelines/only-one-class, no-param-reassign */

import { cloneElement, Fragment, isValidElement } from 'react';

export const DEFAULT_POSITION = 1000;

/** @namespace Framework/Util/SortedMap/SortedList */
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

/** @namespace Framework/Util/SortedMap/SortedRenderList2 */
export class SortedRenderList2 {
    __construct(array, options = {}) {
        this.options = options;

        this._unsortedMap = new Map(array.map(({ key, item }, i) => (
            [key, { item, position: (i + 1) * DEFAULT_POSITION }]
        )));
    }

    getSortedMap = () => {
        const compareFunction = ([, a], [, b]) => a.position - b.position;

        return new Map(
            Array.from(this._unsortedMap.entries()).sort(compareFunction)
        );
    };

    addItem = ({ item, position = this._getDefaultPosition(), key }) => {
        if (!key) {
            // eslint-disable-next-line max-len
            console.warn('An item in SortedRenderList does not have a key specified. Setting the key is advised and this warning could lead to an unexpected behaviour otherwise.');
        }

        // Fallback for key is item object
        this._unsortedMap.set(key || item, { item, position });
    };

    render = () => {
        const { renderItem = this._renderItem } = this.options;

        return Array.from(this.getSortedMap().entries(), ([key, { item }]) => renderItem(key, item));
    };

    getItemByKey = (key) => this._unsortedMap.get(key);

    _renderItem(key, item) {
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

    _getDefaultPosition() {
        return (this._unsortedMap.size + 1) * DEFAULT_POSITION;
    }
}

/** @namespace Framework/Util/SortedMap/SortedRenderList */
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

/** @namespace Framework/Util/SortedMap/createSortedRenderList2 */
export const createSortedRenderList2 = (array = [], options) => new SortedRenderList2(array, options);

/** @namespace Framework/Util/SortedMap/createSortedRenderList */
export const createSortedRenderList = (array = [], options) => new SortedRenderList(array, options);

/** @namespace Framework/Util/SortedMap/createSortedList */
export const createSortedList = (array = [], options) => new SortedList(array, options);
