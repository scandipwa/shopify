import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyNextjsApi/Component/PaginatedConnection/Component/PaginatedConnectionComponent */
export class PaginatedConnectionComponent extends PureComponent {
    static propTypes = {
        renderNextPageButton: PropTypes.func,
        renderPrevPageButton: PropTypes.func,
        renderPage: PropTypes.func.isRequired,
        onNextPageClick: PropTypes.func.isRequired,
        onPrevPageClick: PropTypes.func.isRequired,
        isHasNextPage: PropTypes.bool.isRequired,
        isHasPrevPage: PropTypes.bool.isRequired,
        nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    };

    static defaultProps = {
        renderNextPageButton: null,
        renderPrevPageButton: null
    };

    renderDefaultNextButton() {
        const { onNextPageClick } = this.props;

        // TODO: use Button component here

        return (
            <button onClick={ onNextPageClick }>
                Next
            </button>
        );
    }

    renderNextPageTrigger() {
        const {
            renderNextPageButton,
            onNextPageClick,
            isHasNextPage
        } = this.props;

        if (!isHasNextPage) {
            // we are not listening to visibility and we show no placeholder
            // the container concluded, that there are no next page
            return null;
        }

        if (!renderNextPageButton) {
            return this.renderDefaultNextButton();
        }

        return renderNextPageButton(onNextPageClick);
    }

    renderDefaultPrevButton() {
        const { onPrevPageClick } = this.props;

        // TODO: use Button component here

        return (
            <button onClick={ onPrevPageClick }>
                Prev
            </button>
        );
    }

    renderPrevPageTrigger() {
        const {
            renderPrevPageButton,
            onPrevPageClick,
            isHasPrevPage
        } = this.props;

        if (!isHasPrevPage) {
            // we are not listening to visibility and we show no placeholder
            // the container concluded, that there are no next page
            return null;
        }

        if (!renderPrevPageButton) {
            return this.renderDefaultPrevButton();
        }

        return renderPrevPageButton(onPrevPageClick);
    }

    renderPage() {
        const {
            nodes,
            renderPage
        } = this.props;

        return renderPage(nodes);
    }

    render() {
        return (
            <div block="PaginatedConnection">
                { this.renderPrevPageTrigger() }
                { this.renderPage() }
                { this.renderNextPageTrigger() }
            </div>
        );
    }
}

export default PaginatedConnectionComponent;