import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyNextjsProductVariants/Component/ProductOption/Component/ProductOptionComponent */
export class ProductOptionComponent extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        currentValue: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(
            PropTypes.string
        ).isRequired
    };

    renderLabel() {
        const { name } = this.props;

        return (
            <p>{ name }</p>
        );
    }

    renderOption = (value) => (
        <option
          value={ value }
          key={ value }
        >
            { value }
        </option>
    );

    renderSelect() {
        const {
            name,
            values,
            onChange,
            currentValue
        } = this.props;

        return (
            <select
              value={ currentValue }
              name={ name }
              onChange={ onChange }
            >
                { values.map(this.renderOption) }
            </select>
        );
    }

    render() {
        return (
            <div block="ProductOption">
                { this.renderLabel() }
                { this.renderSelect() }
            </div>
        );
    }
}

export default ProductOptionComponent;
