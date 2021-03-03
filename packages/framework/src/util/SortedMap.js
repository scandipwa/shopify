/* eslint-disable @scandipwa/scandipwa-guidelines/only-one-class */
/* eslint-disable max-classes-per-file */
import { cloneElement, Fragment, isValidElement } from 'react';

export const DEFAULT_POSITION = 1000;

/** @namespace Framework/Util/SortedMap/SortedMap */
export class SortedMap {
    /**
     * Constructor. Used to convert the initial argument to Map.
     * @param {{[key: String]: () => any}} object
     * @param {{renderItem: (key: String, item: () => any) => any}} options
     */
    __construct(object, options = {}) {
        this.options = options;

        this._unsortedMap = new Map(this._formatInitialData(object));
    }

    /**
     * Sorts the Map by position property of each element
     */
    getSortedMap = () => {
        const compareFunction = ([, a], [, b]) => a.position - b.position;

        return new Map(
            // Sort the map by converting it array
            Array.from(this._unsortedMap.entries()).sort(compareFunction)
        );
    };

    /**
     * Adds new item to the unsorted map
     * @param {any} item item to add
     * @param {String} key unique key to be assigned to the map
     * @param {Number} position position in the list after sorting takes place
     */
    addItem = (item, key, position = this._getDefaultPosition()) => {
        if (!key) {
            // eslint-disable-next-line max-len, no-console
            console.warn('An item in SortedMap does not have a key specified. Setting the key is advised and this warning could lead to an unexpected behaviour otherwise.');
        }

        if (!this._isKeyUnique(key)) {
            // eslint-disable-next-line max-len, no-console
            console.error(`An item in SortedMap has a duplicate key "${ key }". The original item with this was key removed as a result. If this is intended, you can supress this message by removing the item from the SortedMap first.`);
        }

        this._unsortedMap.set(key || item, { item, position });
    };

    /**
     * Retrieves an item from the unsorted map by key
     * @param {String} key
     */
    getItemByKey = (key) => this._unsortedMap.get(key);

    /**
     * Removes an item from the unsorted map by key
     * @param {*} key
     */
    removeItemByKey = (key) => this._unsortedMap.delete(key);

    /**
     * Calculates the default position based on the size of the map
     */
    _getDefaultPosition() {
        return (this._unsortedMap.size + 1) * DEFAULT_POSITION;
    }

    /**
     * Validates the uniqueness of the specified key within the Map
     * @param {String} key
     */
    _isKeyUnique(key) {
        return !!this._unsortedMap.get(key);
    }

    /**
     * Applies formatting to the initial data, such as adding the "position" property
     * @param {{[key: String]: () => any}} object intial data
     */
    _formatInitialData(object) {
        return Object.entries(object).map(([key, item], i) => ([
            key,
            { item, position: (i + 1) * DEFAULT_POSITION }
        ]));
    }
}

/** @namespace Framework/Util/SortedMap/SortedRenderMap */
export class SortedRenderMap extends SortedMap {
    /**
     * Renders all items in the sorted Map.
     * @returns {React.ReactNode[]}
     */
    render = () => {
        const { renderItem = this._renderItem } = this.options;

        return Array.from(this.getSortedMap().entries(), ([key, { item }]) => renderItem(key, item));
    };

    /**
     * Renders a single item from the Map.
     * @param {String} key
     * @param {React.ReactNode} item
     */
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
}

/** @namespace Framework/Util/SortedMap/createSortedMap */
export const createSortedMap = (object = {}, options) => new SortedMap(object, options);
/** @namespace Framework/Util/SortedMap/createSortedRenderMap */
export const createSortedRenderMap = (object = {}, options) => new SortedRenderMap(object, options);
