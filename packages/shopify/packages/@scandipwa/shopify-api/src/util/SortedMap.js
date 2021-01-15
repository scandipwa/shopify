/* eslint-disable no-param-reassign */
import { Fragment } from 'react';

/** @namespace ShopifyApi/Util/SortedMap/createSortedRenderList */
export const createSortedRenderList = (array) => {
    const DEFAULT_POSITION = 1000;

    const sortedArray = array.map((renderer, i) => ({
        renderer,
        // start position with 1000
        position: (i + 1) * DEFAULT_POSITION
    }));

    return {
        render: () => sortedArray.sort(
            (a, b) => a.position - b.position
        ).map((renderer, i) => {
            const render = renderer.renderer || renderer;

            return (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={ i }>
                    { render() }
                </Fragment>
            );
        }),

        addRendererToPosition: (renderer, position = DEFAULT_POSITION) => {
            sortedArray.push({ position, renderer });
        }
    };
};
