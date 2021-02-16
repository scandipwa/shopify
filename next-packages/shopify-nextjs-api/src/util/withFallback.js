import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

import { ResponseDataType } from '../api/types';
import Fallback from '../component/Fallback';

/** @namespace ShopifyNextjsApi/Util/WithFallback/FallbackContainer */
export class FallbackContainer extends PureComponent {
    static propTypes = {
        responseData: ResponseDataType,
        component: PropTypes.func.isRequired
    };

    static defaultProps = {
        responseData: {}
    };

    renderFallback(errorCode) {
        return <Fallback statusCode={ errorCode } />;
    }

    getContainerProps() {
        return this.props;
    }

    render() {
        const { component: Component, responseData: { errorCode } } = this.props;

        if (errorCode) {
            return this.renderFallback(errorCode);
        }

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
        return <Component { ...this.getContainerProps() } />;
    }
}

/** @namespace ShopifyNextjsApi/Util/WithFallback/withFallback */
export const withFallback = (component) => {
    const withComponent = (props) => createElement(FallbackContainer, { ...props, component });
    withComponent.displayName = 'withFallback';
    return withComponent;
};
