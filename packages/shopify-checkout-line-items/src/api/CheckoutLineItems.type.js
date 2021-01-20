import PropTypes from 'prop-types';

export const CheckoutLineItemType = PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number
});
