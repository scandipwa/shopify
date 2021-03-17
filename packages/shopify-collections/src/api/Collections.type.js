import { ImageType, PageInfoType } from '@scandipwa/shopify-api/src/api/types';
import PropTypes from 'prop-types';

export const CollectionType = PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    image: ImageType
});

export const CollectionsResponseType = PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
        cursor: PropTypes.string,
        node: CollectionType
    })),
    pageInfo: PageInfoType
});
