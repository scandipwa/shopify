/* eslint-disable no-param-reassign */

const addSelectedOptions = (args, callback, instance) => {
    callback(...args);

    const { product: { variants: [variant] } } = instance;
    const { selectedOptions } = variant;

    instance.selectedOptions = selectedOptions.reduce(
        (acc, { name, value }) => ({ ...acc, [name]: value }),
        {}
    );

    instance.selectedVariant = variant;
};

const addSelectOptionFunction = (args, callback, instance) => {
    callback(args);

    const [name, value] = args;
    const newSelectedOptions = { ...instance.selectedOptions, [name]: value };

    const { product: { variants } } = instance;
    const variant = variants.find(({ selectedOptions }) => (
        selectedOptions.every(({ name, value }) => (
            newSelectedOptions[name] === value
        ))
    ));

    if (!variant) {
        console.warn('Can not find variant matching selected options. Ignoring selection.');
        return;
    }

    instance.selectedOptions = newSelectedOptions;
    instance.selectedVariant = variant;
};

export default {
    'ShopifyProducts/Context/Product/Product': {
        'member-function': {
            __construct: addSelectedOptions,
            selectOption: addSelectOptionFunction
        }
    }
};
