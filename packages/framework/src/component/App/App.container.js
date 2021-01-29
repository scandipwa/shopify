import { HigherOrderComponent, withHOC } from '../../util/HOC';
import AppComponent from './App.component';

/** @namespace Framework/Component/App/Container/AppContainer */
export class AppContainer extends HigherOrderComponent {
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
}

export default withHOC(AppContainer, AppComponent);
