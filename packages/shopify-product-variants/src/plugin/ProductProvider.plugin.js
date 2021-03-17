/* eslint-disable no-param-reassign */

const _getVariantCountFromOptions = (options) => options.reduce(
    (acc, { values }) => values.length * acc, 1
);

const _getStateFromProduct = ({ variants, options }) => {
    if (!variants || !variants.length) {
        return {
            isHasOptions: false,
            isHasOnlyOneVariant: false,
            selectedVariant: {},
            selectedOptions: {}
        };
    }

    const [variant] = variants;
    const { selectedOptions } = variant;

    return {
        // needed, if maybe the variants were not returned at all
        isHasOptions: true,
        selectedVariant: variant,
        // using options as they also persist on listing page
        isHasOnlyOneVariant: _getVariantCountFromOptions(options) === 1,
        selectedOptions: selectedOptions.reduce(
            (acc, { name, value }) => ({ ...acc, [name]: value }),
            {}
        )
    };
};

const onUpdateAddSelectedOptions = (args, callback, instance) => {
    callback(...args);

    const [{
        product: {
            id: prevId,
            variants: prevVariants = []
        }
    }] = args;

    const {
        product,
        product: {
            id,
            variants = []
        }
    } = instance.props;

    if (
        id !== prevId // if the product has chnaged
        || variants.length !== prevVariants.length // variant count changed
    ) {
        instance.setState(_getStateFromProduct(product));
    }
};

const addSelectedOptions = (args, callback, instance) => {
    callback(...args);

    const { product } = instance.props;

    instance.state = {
        ...instance.state || {},
        ..._getStateFromProduct(product)
    };
};

const addFieldsToContext = (args, callback, instance) => {
    const fields = callback(...args);

    const {
        selectedVariant,
        isHasOptions,
        isHasOnlyOneVariant,
        selectedOptions
    } = instance.state;

    return {
        ...fields,
        selectedVariant,
        isHasOptions,
        isHasOnlyOneVariant,
        selectedOptions,
        selectOption: instance.selectOption.bind(instance)
    };
};

const addSelectOptionFunction = (args, callback, instance) => {
    callback(...args);

    const { selectedOptions } = instance.state;
    const { product: { variants } } = instance.props;

    const [name, value] = args;
    const newSelectedOptions = { ...selectedOptions, [name]: value };

    const variant = variants.find(({ selectedOptions }) => (
        selectedOptions.every(({ name, value }) => (
            newSelectedOptions[name] === value
        ))
    ));

    if (!variant) {
        console.warn('Can not find variant matching selected options. Ignoring selection.');
        return;
    }

    instance.setState({
        selectedOptions: newSelectedOptions,
        selectedVariant: variant
    });
};

export default {
    'ShopifyProducts/Context/Products/Provider/ProductsProvider': {
        'member-function': {
            __construct: addSelectedOptions,
            componentDidUpdate: onUpdateAddSelectedOptions,
            getContextValue: addFieldsToContext,
            selectOption: addSelectOptionFunction
        }
    }
};
