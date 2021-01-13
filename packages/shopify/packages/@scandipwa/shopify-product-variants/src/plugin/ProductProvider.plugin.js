/* eslint-disable no-param-reassign */

const addSelectedOptions = (args, callback, instance) => {
    callback(...args);

    const [{ product: { variants } }] = args;
    const [variant, ...restVariants] = variants;
    const { selectedOptions } = variant;

    instance.state = {
        ...instance.state,
        selectedVariant: variant,
        isHasOnlyOneVariant: !restVariants.length,
        selectedOptions: selectedOptions.reduce(
            (acc, { name, value }) => ({ ...acc, [name]: value }),
            {}
        )
    };
};

const addFieldsToContext = (args, callback, instance) => {
    const fields = callback(...args);

    const {
        selectedVariant,
        isHasOnlyOneVariant,
        selectedOptions
    } = instance.state;

    return {
        ...fields,
        selectedVariant,
        isHasOnlyOneVariant,
        selectedOptions,
        selectOption: instance.selectOption.bind(instance)
    };
};

const addSelectOptionFunction = (args, callback, instance) => {
    callback(args);

    const { state: { product, selectedOptions } } = instance;

    const [name, value] = args;
    const newSelectedOptions = { ...selectedOptions, [name]: value };

    const { variants } = product;
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
    'ShopifyProducts/Context/Provider/ProductProvider': {
        'member-function': {
            __construct: addSelectedOptions,
            getContextValue: addFieldsToContext,
            selectOption: addSelectOptionFunction
        }
    }
};
