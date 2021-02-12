import PropTypes from 'prop-types';

export const ImageType = PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string
});

export const PageInfoType = PropTypes.shape({
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool
});

export const ResponseDataType = PropTypes.shape({
    errorCode: PropTypes.number
});

export const paginatedEdgeType = PropTypes.shape({
    cursor: PropTypes.string.isRequired,
    node: PropTypes.shape({}).isRequired
});

export const paginatedResponseType = PropTypes.shape({
    pageInfo: PageInfoType.isRequired,
    edges: PropTypes.arrayOf(
        PropTypes.shape({
            cursor: PropTypes.string.isRequired,
            node: PropTypes.shape({}).isRequired
        })
    )
});

/** @namespace ShopifyNextjsApi/Api/Types/getPaginatedEdgeForNodeType */
export const getPaginatedEdgeForNodeType = (nodeType) => (
    PropTypes.shape({
        cursor: PropTypes.string.isRequired,
        node: nodeType.isRequired
    })
);

/** @namespace ShopifyNextjsApi/Api/Types/getPaginatedResponseForEdgeType */
export const getPaginatedResponseForEdgeType = (edgeType) => (
    PropTypes.shape({
        pageInfo: PageInfoType.isRequired,
        edges: PropTypes.arrayOf(edgeType)
    })
);
