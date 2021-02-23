import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import NextPageContext from './NextPage.context';

/** @namespace NextjsFramework/Context/NextPage/Provider/NextPageProvider */
export class NextPageProvider extends PureComponent {
    static propTypes = {
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
            <NextPageContext.Provider value={ this.getContextValue() }>
                { children }
            </NextPageContext.Provider>
        );
    }
}

export default NextPageProvider;
