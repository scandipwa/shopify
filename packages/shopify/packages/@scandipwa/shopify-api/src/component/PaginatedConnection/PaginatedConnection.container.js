import { history } from '@scandipwa/router/src/component/Router/Router.component';
import ApiClientContext from '@scandipwa/shopify-api/src/apiClient';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import PaginatedConnectionComponent from './PaginatedConnection.component';

/** @namespace ShopifyApi/Component/PaginatedConnection/Container/PaginatedConnectionContainer */
export class PaginatedConnectionContainer extends PureComponent {
    static contextType = ApiClientContext;

    static propTypes = {
        amount: PropTypes.number,
        queryGetter: PropTypes.func.isRequired,
        NextPageButton: PropTypes.node.isRequired,
        PrevPageButton: PropTypes.node.isRequired,
        PagePlaceholderComponent: PropTypes.node.isRequired,
        PageComponent: PropTypes.node.isRequired
    };

    static defaultProps = {
        amount: 20
    };

    containerFunctions = {
        onNextPageClick: this.onNextPageClick.bind(this),
        onPrevPageClick: this.onPrevPageClick.bind(this)
    };

    __constructor(props) {
        super.__constructor(props);

        this.state = {
            isLoading: true,
            isError: false,
            isHasNextPage: false,
            isHasPrevPage: false,
            lastCursor: '',
            firstCursor: '',
            nodes: []
        };

        // make initial request from current cursor position
        this.requestNodes(this.getCurrentCursorFromUrl());
    }

    getCurrentCursorFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const after = urlParams.get('after');
        const before = urlParams.get('before');

        if (after) {
            return { after };
        }

        if (before) {
            return { before };
        }

        return {};
    }

    setCurrentCursorToUrl({ after, before }) {
        const { location: { state } } = history;
        const urlParams = new URLSearchParams(window.location.search);

        if (after) {
            urlParams.set('after', after);
        } else {
            urlParams.delete('after');
        }

        if (before) {
            urlParams.set('before', before);
        } else {
            urlParams.delete('before');
        }

        history.push({
            search: `?${urlParams.toString() }`,
            state
        });
    }

    async requestNodes(cursor) {
        const { postQuery } = this.context;

        const {
            amount,
            queryGetter
        } = this.props;

        const query = queryGetter({
            // TODO: support "reverse", "sortKey" and "query"
            first: amount,
            ...cursor
        });

        this.setCurrentCursorToUrl(cursor);

        try {
            const response = await postQuery(query);
            this.processResponse(response);
        } catch (error) {
            this.processError(error);
        }
    }

    processError(error) {
        console.log(error);

        this.setState({
            isLoading: false,
            isError: true,
            // reset all bellow values to initial
            // TODO: remove if not required
            isHasNextPage: false,
            isHasPrevPage: false,
            lastCursor: '',
            firstCursor: '',
            nodes: []
        });
    }

    processResponse(response) {
        const [{ edges, pageInfo }] = Object.values(response);
        const { hasNextPage, hasPreviousPage } = pageInfo;

        const {
            lastCursor,
            firstCursor,
            nodes
        } = edges.reduce((acc, { node, cursor }, index) => {
            if (index === 0) {
                acc.firstCursor = cursor;
            }

            if (index === edges.length - 1) {
                acc.lastCursor = cursor;
            }

            acc.nodes.push(node);

            return acc;
        }, {
            lastCursor: '',
            firstCursor: '',
            nodes: []
        });

        this.setState({
            isLoading: false,
            isError: false,
            isHasNextPage: hasNextPage,
            isHasPrevPage: hasPreviousPage,
            lastCursor,
            firstCursor,
            nodes
        });
    }

    onNextPageClick() {
        const { lastCursor } = this.state;
        this.requestNodes({ after: lastCursor });
    }

    onPrevPageClick() {
        const { firstCursor } = this.state;
        this.requestNodes({ before: firstCursor });
    }

    containerProps = () => {
        const {
            NextPageButton,
            PrevPageButton,
            PagePlaceholderComponent,
            PageComponent
        } = this.props;

        const {
            isError,
            isLoading,
            isHasNextPage,
            isHasPrevPage,
            nodes
        } = this.state;

        return {
            NextPageButton,
            PrevPageButton,
            PagePlaceholderComponent,
            PageComponent,
            isHasNextPage,
            isHasPrevPage,
            isLoading,
            isError,
            nodes
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

export default PaginatedConnectionContainer;