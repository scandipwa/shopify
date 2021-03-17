import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';

import { withUseFormContext, withUseWatch } from '../../util/withUseForm';
import FormErrorComponent from './FormError.component';
import { FORM_ERROR_KEY } from './FormError.config';

/** @namespace Form/Component/FormError/Container/FormErrorContainer */
export class FormErrorContainer extends HigherOrderComponent {
    componentDidUpdate(prevProps) {
        const { useWatch: prevUseWatch } = prevProps;
        const { useWatch } = this.props;

        if (JSON.stringify(useWatch) !== JSON.stringify(prevUseWatch)) {
            this.onFieldsChange();
        }
    }

    onFieldsChange() {
        const {
            useForm: {
                errors: {
                    [FORM_ERROR_KEY]: error
                },
                clearErrors
            }
        } = this.props;

        if (error) {
            clearErrors(FORM_ERROR_KEY);
        }
    }
}

export default withHOC(
    withUseWatch(withUseFormContext(FormErrorContainer)),
    FormErrorComponent
);
