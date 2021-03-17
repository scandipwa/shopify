import PropTypes from 'prop-types';

export const ProductPriceType = PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired
});
