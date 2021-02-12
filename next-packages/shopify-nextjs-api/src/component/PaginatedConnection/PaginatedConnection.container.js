import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { paginatedResponseType } from '../../api/types';
import PaginatedConnectionComponent from './PaginatedConnection.component';

/** @namespace ShopifyNextjsApi/Component/PaginatedConnection/Container/PaginatedConnectionContainer */
export class PaginatedConnectionContainer extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        renderNextPageButton: PropTypes.any,
        // eslint-disable-next-line react/forbid-prop-types
        renderPrevPageButton: PropTypes.any,
        renderPage: PropTypes.func.isRequired,
        paginatedNode: PropTypes.shape(paginatedResponseType).isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        router: PropTypes.any.isRequired
    };

    static defaultProps = {
        renderNextPageButton: null,
        renderPrevPageButton: null
    };

    containerFunctions = {
        onNextPageClick: this.onNextPageClick.bind(this),
        onPrevPageClick: this.onPrevPageClick.bind(this)
    };

    hasNextPage() {
        const {
            paginatedNode: {
                pageInfo: {
                    hasNextPage
                }
            }
        } = this.props;

        return hasNextPage;
    }

    hasPrevPage() {
        const {
            paginatedNode: {
                pageInfo: {
                    hasPreviousPage
                }
            }
        } = this.props;

        return hasPreviousPage;
    }

    onNextPageClick() {
        const { router } = this.props;
        const lastCursor = this.getLastCursor();

        router.push(`${ router.pathname }?after=${ lastCursor }`);
    }

    onPrevPageClick() {
        const { router } = this.props;
        const firstCursor = this.getFirstCursor();

        router.push(`${ router.pathname }?before=${ firstCursor }`);
    }

    getNodes = () => {
        const { paginatedNode: { edges } } = this.props;

        return edges.map(({ node }) => node);
    };

    getFirstCursor = () => {
        const { paginatedNode: { edges } } = this.props;

        if (!edges.length) {
            return null;
        }

        return edges[0].cursor;
    };

    getLastCursor = () => {
        const { paginatedNode: { edges } } = this.props;

        if (!edges.length) {
            return null;
        }

        return edges[edges.length - 1].cursor;
    };

    containerProps = () => {
        const {
            renderNextPageButton,
            renderPrevPageButton,
            renderPage
        } = this.props;

        return {
            renderPage,
            renderNextPageButton,
            renderPrevPageButton,
            isHasNextPage: this.hasNextPage(),
            isHasPrevPage: this.hasPrevPage(),
            nodes: this.getNodes()
        };
    };

    render() {
        return (
            <PaginatedConnectionComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(PaginatedConnectionContainer);
