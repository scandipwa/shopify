import { ProductType } from '@scandipwa/shopify-products/src/api/Products.type';
import PropTypes from 'prop-types';

export const ProductRecommendationsType = PropTypes.arrayOf(ProductType);
export { ProductType as ProductRecommendationType };
