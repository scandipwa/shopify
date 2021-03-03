import PropTypes from 'prop-types';

import { HigherOrderComponent, withHOC } from '../../util/HOC';
import AppComponent from './App.component';

/** @namespace NextjsFramework/Component/App/Container/AppContainer */
export class AppContainer extends HigherOrderComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    productionFunctions = [];

    developmentFunctions = [];

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(props) {
        super(props);

        this.configureAppBasedOnEnvironment();
    }

    configureAppBasedOnEnvironment() {
        const functionsToRun = process.env.NODE_ENV === 'production'
            ? this.productionFunctions
            : this.developmentFunctions;

        functionsToRun.forEach((func) => func());
    }

    render() {
        const {
            componentOrComponentMap: App,
            children
        } = this.props;

        return <App>{ children }</App>;
    }
}

export default withHOC(AppContainer, AppComponent);
