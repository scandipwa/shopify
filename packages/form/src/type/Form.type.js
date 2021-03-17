import PropTypes from 'prop-types';

export const UseFormErrorType = PropTypes.shape({
    message: PropTypes.string
});

export const UseFormType = PropTypes.shape({
    handleSubmit: PropTypes.func,
    errors: PropTypes.objectOf(UseFormErrorType)
});
