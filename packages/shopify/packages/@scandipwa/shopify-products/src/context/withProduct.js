import ProductContext from './product';

/** @namespace ShopifyProducts/Context/WithProduct/withApiClient */
export const withApiClient = (Component) => (props) => (
    <ProductContext.Consumer>
        { (consumerProps) => <Component props={ { ...props, consumerProps } } /> }
    </ProductContext.Consumer>
);
