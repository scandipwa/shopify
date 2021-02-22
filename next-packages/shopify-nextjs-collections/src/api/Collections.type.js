import {
    getPaginatedEdgeForNodeType, getPaginatedResponseForEdgeType, ImageType
} from '@scandipwa/shopify-nextjs-api/src/api/types';
import PropTypes from 'prop-types';

export const CollectionType = PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    image: ImageType
});

export const CollectionEdgeType = getPaginatedEdgeForNodeType(CollectionType);
export const CollectionsResponseType = getPaginatedResponseForEdgeType(CollectionEdgeType);
