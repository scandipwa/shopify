/** @namespace ShopifyApi/Util/SortedMap/createSortedMap */
export const createSortedMap = (mapOrObject) => {
    const map = mapOrObject instanceof Map
        ? mapOrObject
        : new Map(Object.entries(mapOrObject));

    map.map = (...mapArgs) => Array.from(
        map.values(),
        ...mapArgs
    );

    map.insertEntryBefore = (existingKey, newEntry) => {
        const entries = Array.from(map.entries());
        const keyIndex = entries.findIndex(([key]) => key === existingKey);

        if (keyIndex === -1) {
            console.warn(
                `Tried inserting into sorted object before the existing key "${ existingKey }". `
                + 'Failed finding key to insert before. Appending to the end.'
            );

            map.set(...newEntry);
            return;
        }

        entries.splice(keyIndex, 0, newEntry);
        map.clear();

        entries.forEach(([key, value]) => {
            map.set(key, value);
        });
    };

    return map;
};
