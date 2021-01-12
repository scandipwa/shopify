import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace ShopifyApi/Component/PaginatedConnection/Component/PaginatedConnectionComponent */
export class PaginatedConnectionComponent extends PureComponent {
    static propTypes = {
        renderNextPageButton: PropTypes.func,
        renderPrevPageButton: PropTypes.func,
        renderPlaceholder: PropTypes.func.isRequired,
        renderPage: PropTypes.func.isRequired,
        onNextPageClick: PropTypes.func.isRequired,
        onPrevPageClick: PropTypes.func.isRequired,
        isHasNextPage: PropTypes.bool.isRequired,
        isHasPrevPage: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    };

    static defaultProps = {
        renderNextPageButton: null,
        renderPrevPageButton: null
    };

    renderPlaceholder() {
        const { renderPlaceholder } = this.props;

        return renderPlaceholder();
    }

    renderDefaultNextButton() {
        const { onNextPageClick } = this.props;

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

        return renderPrevPageButton(onPrevPageClick);
    }

    renderPage() {
        const {
            nodes,
            isLoading,
            renderPage
        } = this.props;

        if (isLoading) {
            return this.renderPlaceholder();
        }

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
