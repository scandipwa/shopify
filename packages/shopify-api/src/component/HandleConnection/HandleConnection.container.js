import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ApiContext from '../../context/ShopifyApi.context';

/** @namespace ShopifyApi/Component/HandleConnection/Container/HandleConnectionContainer */
export class HandleConnectionContainer extends PureComponent {
    static propTypes = {
        defaultNode: PropTypes.shape({}),
        handle: PropTypes.string.isRequired,
        renderNode: PropTypes.func.isRequired,
        renderNodePlaceholder: PropTypes.func.isRequired,
        queryGetter: PropTypes.func.isRequired,
        responseProcessor: PropTypes.func.isRequired
    };

    static defaultProps = {
        defaultNode: {}
    };

    static contextType = ApiContext;

    componentDidMount() {
        // even if the page is in state, update the data
        this.getNodeByHandler();
    }

    __construct(props) {
        super.__construct(props);

        const { defaultNode } = props;

        this.state = {
            node: defaultNode,
            isLoading: !Object.keys(defaultNode).length,
            isError: false
        };
    }

    containerProps = () => {
        const {
            node,
            isLoading,
            isError
        } = this.state;

        return {
            node,
            isLoading,
            isError
        };
    };

    async getNodeByHandler() {
        const {
            handle,
            queryGetter,
            responseProcessor
        } = this.props;

        const { postQuery } = this.context;

        try {
            const response = await postQuery(queryGetter({ handle }));
            const node = responseProcessor(response);

            this.setState({
                node,
                isLoading: false,
                isError: false
            });
        } catch (e) {
            // TODO: use logger
            console.error(e);

            this.setState({
                isLoading: false,
                isError: true
            });
        }
    }

    render() {
        const {
            renderNode,
            renderNodePlaceholder
        } = this.props;

        const {
            node,
            isLoading
        } = this.state;

        if (isLoading) {
            return renderNodePlaceholder();
        }

        return renderNode(node);
    }
}

export default HandleConnectionContainer;
