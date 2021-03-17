import { ImageType } from '@scandipwa/shopify-api/src/api/types';
import PropTypes from 'prop-types';

export const ProductVariantType = PropTypes.shape({
    id: PropTypes.string,
    sku: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    image: ImageType
});
