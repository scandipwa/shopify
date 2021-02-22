import DefaultFallback from 'next/error';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyNextjsApi/Component/Fallback/Component/FallbackComponent */
export class FallbackComponent extends PureComponent {
    static propTypes = {
        statusCode: PropTypes.number.isRequired
    };

    renderFallback = () => {
        const { statusCode } = this.props;

        return <DefaultFallback statusCode={ statusCode } />;
    };

    render() {
        return this.renderFallback();
    }
}

export default FallbackComponent;
