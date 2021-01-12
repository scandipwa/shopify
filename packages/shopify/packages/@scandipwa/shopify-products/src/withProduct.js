import ProductContext from './product';

/** @namespace ShopifyProducts/WithProduct/withApiClient */
export const withApiClient = (Component) => (props) => (
    <ProductContext.Consumer>
        { (consumerProps) => <Component props={ { ...props, consumerProps } } /> }
    </ProductContext.Consumer>
);
