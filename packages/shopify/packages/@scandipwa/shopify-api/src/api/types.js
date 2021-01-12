import PropTypes from 'prop-types';

export const ImageType = PropTypes.shape({
    altText: PropTypes.string,
    transformedSrc: PropTypes.string
});

export const PageInfoType = PropTypes.shape({
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool
});
