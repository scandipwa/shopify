import { ErrorMessage } from '@hookform/error-message';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { FORM_ERROR_KEY } from './FormError.config';

/** @namespace Form/Component/FormError/Component/FormErrorComponent */
export class FormErrorComponent extends PureComponent {
    static propTypes = {
        renderError: PropTypes.func
    };

    static defaultProps = {
        renderError: ({ message }) => (
            <p>{ message }</p>
        )
    };

    render() {
        const { renderError } = this.props;

        return (
            <ErrorMessage
              name={ FORM_ERROR_KEY }
              render={ renderError }
            />
        );
    }
}

export default FormErrorComponent;
