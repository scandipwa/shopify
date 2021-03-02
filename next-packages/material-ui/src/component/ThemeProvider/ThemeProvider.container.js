import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace Materialui/Component/ThemeProvider/Container/ThemeProviderContainer */
export class ThemeProviderContainer extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    containerFunctions = {};

    containerProps = () => {
        const { children } = this.props;

        return {
            children,
            theme: this.getTheme()
        };
    };

    getTheme() {
        return createMuiTheme({
            palette: {
                primary: {
                    // see more https://www.materialui.co/colors/orange
                    // eslint-disable-next-line no-magic-numbers
                    main: orange[500]
                }
            },
            overrides: {
                MuiFormControl: {
                    root: {
                        minWidth: '250px'
                    }
                }
            }
        });
    }

    render() {
        return (
            <ThemeProvider
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ThemeProviderContainer;
