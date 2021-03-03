import App from '@scandipwa/nextjs-framework/src/component/App';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import NextPageContext from './NextPage.context';

/** @namespace NextjsFramework/Context/NextPage/Provider/NextPageProvider */
export class NextPageProvider extends PureComponent {
    static propTypes = {
        // TODO: Figure out a way to dinamically declare prop types
        props: PropTypes.shape({}).isRequired,
        children: PropTypes.node.isRequired
    };

    getContextValue() {
        const { props } = this.props;
        return { props };
    }

    render() {
        const { children } = this.props;

        return (
            <App>
                <NextPageContext.Provider value={ this.getContextValue() }>
                    { children }
                </NextPageContext.Provider>
            </App>
        );
    }
}

export default NextPageProvider;
