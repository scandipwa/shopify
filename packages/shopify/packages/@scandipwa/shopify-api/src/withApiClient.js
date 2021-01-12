import ApiClientContext from './apiClient';

/** @namespace ShopifyApi/WithApiClient/withApiClient */
export const withApiClient = (Component) => (props) => (
    <ApiClientContext.Consumer>
        { (consumerProps) => <Component props={ { ...props, consumerProps } } /> }
    </ApiClientContext.Consumer>
);
