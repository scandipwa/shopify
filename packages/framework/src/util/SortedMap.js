/* eslint-disable no-param-reassign */
import { Fragment } from 'react';

export const DEFAULT_POSITION = 1000;

/** @namespace Framework/Util/SortedMap/SortedRenderList */
export class SortedRenderList {
    __construct(array, options = {}) {
        this.options = options;

        this._unsortedArray = array.map((renderer, i) => ({
            renderer,
            // start position with 1000
            position: (i + 1) * DEFAULT_POSITION
        }));
    }

    _renderItem({ renderer }, i) {
        return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={ i }>
                { renderer() }
            </Fragment>
        );
    }

    render = () => {
        const { renderItem = this._renderItem } = this.options;
        return this.getSortedArray().map(renderItem);
    };

    getSortedArray = () => this._unsortedArray.sort(
        (a, b) => a.position - b.position
    );

    addRendererToPosition = (renderer, position = DEFAULT_POSITION) => {
        this._unsortedArray.push({ position, renderer });
    };
}

/** @namespace Framework/Util/SortedMap/createSortedRenderList */
export const createSortedRenderList = (array = [], options) => new SortedRenderList(array, options);
