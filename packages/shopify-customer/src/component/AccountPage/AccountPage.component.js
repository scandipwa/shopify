import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import CustomerContext from '../../context/Customer.context';
import AccountDetails from '../AccountDetails';
import AccountFallbackPage from '../AccountFallbackPage';

/**
 * Account page component
 * @namespace ShopifyCustomer/Component/AccountPage/Component/AccountPageComponent */
export class AccountPageComponent extends PureComponent {
    static contextType = CustomerContext;

    /**
     * A list of render methods used by account page.
     * Read more: [SortedRenderMap](../../solutions/sortedmap-and-sortedrendermap.md)
     */
    contentRenderMap = createSortedRenderMap({
        accountPageAccountDetails: this.renderAccountDetails.bind(this)
    });

    renderAccountDetails() {
        return (
            <AccountDetails />
        );
    }

    renderContent() {
        return this.contentRenderList.render();
    }

    renderLoading() {
        return (
            <AccountFallbackPage />
        );
    }

    render() {
        const { isCustomerLoading } = this.context;

        if (isCustomerLoading) {
            return this.renderLoading();
        }

        return (
            <div block="AccountPage">
                { this.renderContent() }
            </div>
        );
    }
}

export default AccountPageComponent;
