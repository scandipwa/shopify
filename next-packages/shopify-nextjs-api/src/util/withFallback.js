import NextPageContext from '@scandipwa/nextjs-framework/src/context/NextPage.context';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

import Fallback from '../component/Fallback';

/** @namespace ShopifyNextjsApi/Util/WithFallback/FallbackContainer */
export class FallbackContainer extends PureComponent {
    static contextType = NextPageContext;

    static propTypes = {
        component: PropTypes.func.isRequired
    };

    renderFallback(errorCode) {
        return <Fallback statusCode={ errorCode } />;
    }

    getContainerProps() {
        return this.props;
    }

    render() {
        const { props: { responseData: { errorCode } } } = this.context;
        const { component: Component } = this.props;

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
