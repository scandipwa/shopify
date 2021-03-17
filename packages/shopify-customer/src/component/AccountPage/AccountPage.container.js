import { HigherOrderComponent, withHOC } from '@scandipwa/framework/src/util/HOC';
import { history } from '@scandipwa/router/src/component/Router/Router.component';

import CustomerContext from '../../context/Customer.context';
import AccountPageComponent from './AccountPage.component';

/**
 * Account page container. Used to setup a redirect in case user is not logged in.
 * @namespace ShopifyCustomer/Component/AccountPage/Container/AccountPageContainer */
export class AccountPageContainer extends HigherOrderComponent {
    static contextType = CustomerContext;

    __construct(props) {
        super.__construct(props);

        this.redirectIfNotLoggedIn();
    }

    redirectIfNotLoggedIn() {
        const { isLoggedIn } = this.context;

        if (!isLoggedIn) {
            history.push('/account/login');
        }
    }
}

export default withHOC(AccountPageContainer, AccountPageComponent);
