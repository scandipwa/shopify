import { createSortedRenderMap } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import CustomerContext from '../../context/Customer.context';

/** @namespace ShopifyCustomer/Component/AccountDetails/Component/AccountDetailsComponent */
export class AccountDetailsComponent extends PureComponent {
    static contextType = CustomerContext;

    detailsRenderList = createSortedRenderMap({
        accountDetailsNameSurname: this.renderNameSurname.bind(this)
    });

    renderNameSurname() {
        // TODO: move to separate module ?
        const { customer: { firstName, lastName } } = this.context;

        return (
            <p>
                { `${ firstName } ${ lastName }` }
            </p>
        );
    }

    renderContent() {
        return this.detailsRenderList.render();
    }

    render() {
        return (
            <div block="AccountDetails">
                { this.renderContent() }
            </div>
        );
    }
}

export default AccountDetailsComponent;
