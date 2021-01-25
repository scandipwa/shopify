import PropTypes from 'prop-types';

export const CustomerAddressType = PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    company: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    province: PropTypes.string,
    zip: PropTypes.string,
    phone: PropTypes.string,
    formatted: PropTypes.arrayOf(PropTypes.string)
});
