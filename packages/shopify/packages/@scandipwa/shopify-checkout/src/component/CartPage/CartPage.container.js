import { HistoryType, MatchType } from '@scandipwa/router/src/type/Router.type';
import { HigherOrderComponent, withHOC } from '@scandipwa/shopify-api';
import HandleConnection from '@scandipwa/shopify-api/src/component/HandleConnection';

import { processPageByHandleResponse } from '../../api/Page.processor';
import getPageQueryOfType, { SINGLE_PAGE } from '../../api/Page.query';
import CartFallbackPage from '../CartFallbackPage';
import CartPageComponent from './CartPage.component';
import { CART_COMPONENT_PAGE, CART_FALLBACK_PAGE } from './CartPage.config';

/** @namespace ShopifyCheckout/Component/CartPage/Container/CartPageContainer */
export class CartPageContainer extends HigherOrderComponent {
    static propTypes = {
        ...HigherOrderComponent.propTypes,
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    getPageFromHistoryState() {
        const { history } = this.props;
        return history?.location?.state?.page;
    }

    getPageHandle() {
        const { match: { params: { handle } } } = this.props;
        return handle;
    }

    renderPagePlaceholder = () => {
        const Fallback = this._getComponentByKey(CART_FALLBACK_PAGE);
        return <Fallback />;
    };

    renderPageComponent = (node) => {
        const Component = this._getComponentByKey(CART_COMPONENT_PAGE);
        return <Component page={ node } />;
    };

    render() {
        return (
            <HandleConnection
              handle={ this.getPageHandle() }
              defaultNode={ this.getPageFromHistoryState() }
              renderNode={ this.renderPageComponent }
              renderNodePlaceholder={ this.renderPagePlaceholder }
              queryGetter={ getPageQueryOfType(SINGLE_PAGE) }
              responseProcessor={ processPageByHandleResponse }
            />
        );
    }
}

export default withHOC(CartPageContainer, {
    [CART_FALLBACK_PAGE]: CartFallbackPage,
    [CART_COMPONENT_PAGE]: CartPageComponent
});
