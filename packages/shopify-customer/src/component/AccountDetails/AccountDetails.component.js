import { createSortedRenderList } from '@scandipwa/framework/src/util/SortedMap';
import { PureComponent } from 'react';

import CustomerContext from '../../context/Customer.context';

/**
 * Account details component
 * @namespace ShopifyCustomer/Component/AccountDetails/Component/AccountDetailsComponent */
export class AccountDetailsComponent extends PureComponent {
    static contextType = CustomerContext;

    /**
     * A list of render methods used by account details component
     * @extPoint Inject render methods to be displayed in account details
     * @extExample (member, instance) => {
     *     member.addItemToPosition(() => <MyComponent />);
     *     return member;
     * }
     */
    detailsRenderList = createSortedRenderList([
        this.renderNameSurname.bind(this)
    ]);

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
