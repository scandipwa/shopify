/* eslint-disable no-param-reassign */

const processVariants = ([product], callback) => {
    // process with original processor
    callback(product);

    const { variants: { edges } = {} } = product;

    if (!edges) {
        return;
    }

    product.variants = edges.map(({ node }) => node);
};

export default {
    'ShopifyProducts/Api/Products/Processor/processProduct': {
        function: processVariants
    }
};
