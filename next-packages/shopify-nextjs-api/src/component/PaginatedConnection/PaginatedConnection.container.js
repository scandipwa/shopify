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
        // Allow to change the name of before/after query params
        beforeParamName: PropTypes.string,
        afterParamName: PropTypes.string,
        renderPage: PropTypes.func.isRequired,
        paginatedResponse: paginatedResponseType.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        router: PropTypes.any.isRequired
    };

    static defaultProps = {
        renderNextPageButton: null,
        renderPrevPageButton: null,
        beforeParamName: 'before',
        afterParamName: 'after'
    };

    containerFunctions = {
        onNextPageClick: this.onNextPageClick.bind(this),
        onPrevPageClick: this.onPrevPageClick.bind(this)
    };

    hasNextPage() {
        const {
            paginatedResponse: {
                pageInfo: {
                    hasNextPage
                }
            }
        } = this.props;

        return hasNextPage;
    }

    hasPrevPage() {
        const {
            paginatedResponse: {
                pageInfo: {
                    hasPreviousPage
                }
            }
        } = this.props;

        return hasPreviousPage;
    }

    getQueryParams(params) {
        const queryParams = Object.entries(params).reduce((urlParams, keyValuePair) => {
            const [key, value] = keyValuePair;

            if (typeof value !== 'undefined') {
                urlParams.set(key, value);
            }

            return urlParams;
        }, new URLSearchParams());

        return queryParams.toString();
    }

    onNextPageClick() {
        const { router, afterParamName, beforeParamName } = this.props;
        const lastCursor = this.getLastCursor();
        const queryParams = {
            ...router.query,
            [afterParamName]: lastCursor,
            // Clear value from previous query if present
            [beforeParamName]: undefined
        };

        router.push(`${ router.pathname }?${ this.getQueryParams(queryParams) }`);
    }

    onPrevPageClick() {
        const { router, beforeParamName, afterParamName } = this.props;
        const firstCursor = this.getFirstCursor();
        const queryParams = {
            ...router.query,
            [beforeParamName]: firstCursor,
            // Clear value from previous query if present
            [afterParamName]: undefined
        };

        router.push(`${ router.pathname }?${ this.getQueryParams(queryParams) }`);
    }

    getNodes = () => {
        const { paginatedResponse: { edges } } = this.props;

        return edges.map(({ node }) => node);
    };

    getFirstCursor = () => {
        const { paginatedResponse: { edges } } = this.props;

        if (!edges.length) {
            return null;
        }

        return edges[0].cursor;
    };

    getLastCursor = () => {
        const { paginatedResponse: { edges } } = this.props;

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
