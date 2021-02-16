import {
    getPaginatedEdgeForNodeType,
    getPaginatedResponseForEdgeType,
    ImageType
} from '@scandipwa/shopify-nextjs-api/src/api/types';
import PropTypes from 'prop-types';

export const ProductType = PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    image: ImageType
});

export const ProductEdgeType = getPaginatedEdgeForNodeType(ProductType);
export const ProductsResponseType = getPaginatedResponseForEdgeType(ProductEdgeType);
