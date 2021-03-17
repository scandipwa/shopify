import { history } from '@scandipwa/router/src/component/Router/Router.component';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ApiContext from '../../context/ShopifyApi.context';
import PaginatedConnectionComponent from './PaginatedConnection.component';

/**
 * Paginated connection container. Should be used in the code to retrieve and render the data from Shopify Storefront API.
 * This component should be used to work with lists of entities that support Shopify pagination. To retrieve and render single entities use HandleConnection.
 * Used to make a request to Shopify Storefront API, define event handlers, and utilize the pagination data from Shopify response.
 * @namespace ShopifyApi/Component/PaginatedConnection/Container/PaginatedConnectionContainer */
export class PaginatedConnectionContainer extends PureComponent {
    static contextType = ApiContext;

    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        renderNextPageButton: PropTypes.any,
        // eslint-disable-next-line react/forbid-prop-types
        renderPrevPageButton: PropTypes.any,
        renderPlaceholder: PropTypes.func.isRequired,
        renderPage: PropTypes.func.isRequired,
        amount: PropTypes.number,
        queryGetter: PropTypes.func.isRequired,
        responseProcessor: PropTypes.func.isRequired
    };

    static defaultProps = {
        amount: 20,
        renderNextPageButton: null,
        renderPrevPageButton: null
    };

    containerFunctions = {
        onNextPageClick: this.onNextPageClick.bind(this),
        onPrevPageClick: this.onPrevPageClick.bind(this)
    };

    componentDidMount() {
        // make initial request from current cursor position
        this.requestNodes(this.getCurrentCursorFromUrl());
    }

    __construct(props) {
        super.__construct(props);

        this.state = {
            isLoading: true,
            isError: false,
            isHasNextPage: false,
            isHasPrevPage: false,
            lastCursor: '',
            firstCursor: '',
            nodes: []
        };
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
        const initialSearch = window.location.search;
        const urlParams = new URLSearchParams(initialSearch);

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

        const newSearch = urlParams.toString();

        if (newSearch === initialSearch) {
            return;
        }

        history.push({
            search: `?${newSearch}`,
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
        this.setState({ isLoading: true });

        try {
            const response = await postQuery(query);
            this.processResponse(response);
        } catch (error) {
            this.processError(error);
        }
    }

    processError(error) {
        console.error(error);

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
        const { responseProcessor } = this.props;
        const { edges, pageInfo } = responseProcessor(response);
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
            renderPage,
            renderPlaceholder,
            renderNextPageButton,
            renderPrevPageButton
        } = this.props;

        const {
            isError,
            isLoading,
            isHasNextPage,
            isHasPrevPage,
            nodes
        } = this.state;

        return {
            renderPage,
            renderPlaceholder,
            renderNextPageButton,
            renderPrevPageButton,
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
