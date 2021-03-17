/* eslint-disable no-param-reassign */

const onProductUpdateQuantity = (args, callback, instance) => {
    callback(...args);

    const [, { selectedVariant: { id: prevId } = {} }] = args;
    const { selectedVariant: { id } = {} } = instance.state;

    if (prevId !== id) {
        instance.setState({
            quantity: 1
        });
    }
};

const addQuantity = (args, callback, instance) => {
    callback(...args);

    // Allow passing quantity as a prop for context provider
    const [{ quantity = 1 }] = args;

    instance.state = {
        ...instance.state || {},
        quantity
    };
};

const addFieldsToContext = (args, callback, instance) => {
    const fields = callback(...args);

    const {
        quantity,
        selectedVariant: { quantityAvailable } = {}
    } = instance.state;

    return {
        ...fields,
        updateQuantity: instance.updateQuantity.bind(instance),
        maxQuantity: quantityAvailable,
        quantity
    };
};

const addUpdateQuantityFunction = (args, callback, instance) => {
    callback(...args);

    const [quantity] = args;
    const { selectedVariant: { quantityAvailable } = {} } = instance.state;

    if (quantity > quantityAvailable) {
        // change to max quanity if above
        instance.setState({ quantity: quantityAvailable });
        return;
    }

    if (quantity < 1) {
        // if qty is lover than 1, keep it above 1
        instance.setState({ quantity: 1 });
        return;
    }

    instance.setState({ quantity });
};

export default {
    'ShopifyNextjsProducts/Context/Products/Provider/ProductsProvider': {
        'member-function': {
            __construct: addQuantity,
            componentDidUpdate: onProductUpdateQuantity,
            getContextValue: addFieldsToContext,
            updateQuantity: addUpdateQuantityFunction
        }
    }
};
