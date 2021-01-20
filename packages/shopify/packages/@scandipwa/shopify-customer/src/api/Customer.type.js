import PropTypes from 'prop-types';

export const CustomerType = PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    displayName: PropTypes.string
});
