import PropTypes from 'prop-types';

export const ImageType = PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string
});

export const PageInfoType = PropTypes.shape({
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool
});
