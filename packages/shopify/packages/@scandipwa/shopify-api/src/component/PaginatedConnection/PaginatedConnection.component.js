import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

/** @namespace ShopifyApi/Component/PaginatedConnection/Component/PaginatedConnectionComponent */
export class PaginatedConnectionComponent extends PureComponent {
    static propTypes = {
        NextPageButton: PropTypes.node.isRequired,
        PrevPageButton: PropTypes.node.isRequired,
        PagePlaceholderComponent: PropTypes.node.isRequired,
        PageComponent: PropTypes.node.isRequired,
        onNextPageClick: PropTypes.func.isRequired,
        onPrevPageClick: PropTypes.func.isRequired,
        isHasNextPage: PropTypes.bool.isRequired,
        isHasPrevPage: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    };

    renderPlaceholder() {
        const { PagePlaceholderComponent } = this.props;

        return (
            <PagePlaceholderComponent />
        );
    }

    renderNextPageTrigger() {
        const {
            NextPageButton,
            onNextPageClick,
            isHasNextPage
        } = this.props;

        if (!isHasNextPage) {
            // we are not listening to visibility and we show no placeholder
            // the container concluded, that there are no next page
            return null;
        }

        return (
            <NextPageButton
              onClick={ onNextPageClick }
            />
        );
    }

    renderPrevPageTrigger() {
        const {
            PrevPageButton,
            onPrevPageClick,
            isHasPrevPage
        } = this.props;

        if (!isHasPrevPage) {
            // we are not listening to visibility and we show no placeholder
            // the container concluded, that there are no next page
            return null;
        }

        return (
            <PrevPageButton
              onClick={ onPrevPageClick }
            />
        );
    }

    renderPage() {
        const {
            nodes,
            isLoading,
            PageComponent
        } = this.props;

        if (isLoading) {
            return this.renderPlaceholder();
        }

        return createElement(PageComponent, { nodes });
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
