/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import { Field } from './util/Query/Field';
import {
    GraphQlRequestType,
    prepareRequest
} from './util/Query/prepareDocument';
import { executePost } from './util/Request';

export type ResponseParser = (response: any) => unknown;

export type RequestOptions = {
    endpoint?: string,
    headers?: any,
    middleware?: ResponseParser
};

export const defaultOptions: RequestOptions = {
    endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/graphql',
    middleware: (response: any) => response
};

/** @namespace Graphql/Index/arrayize */
export const arrayize = <T>(val: T|T[]): T[] => (Array.isArray(val) ? val : [val]);

/** @namespace Graphql/Index/Client */
export class Client {
    protected options?: RequestOptions = defaultOptions;

    protected post = async <
        N extends string,
        RT,
        F extends Field<N, RT>
    >(rawMutations: F | F[], options: RequestOptions, requestType: GraphQlRequestType) => {
        const fieldArray = arrayize(rawMutations);

        const response = await executePost(
            prepareRequest(fieldArray, requestType),
            {
                ...this.options,
                ...options
            }
        );

        const parsedResponse = this.options.middleware(response);

        return parsedResponse as {
            [k in N]: Promise<F['resultTypeHolder']>
        };
    };

    setEndpoint = (endpoint: string): void => {
        this.options.endpoint = endpoint;
    };

    setMiddleware = (parser: ResponseParser): void => {
        this.options.middleware = parser;
    };

    setHeaders = (headers: any): void => {
        this.options.headers = headers;
    };

    getOptions = (): RequestOptions => this.options;

    postQuery = <N extends string, RT, F extends Field<N, RT>>(
        rawQueries: F | F[],
        options: RequestOptions
    ) => this.post(rawQueries, options, GraphQlRequestType.Query);

    postMutation = <N extends string, RT, F extends Field<N, RT>>(
        rawMutations: F | F[],
        options: RequestOptions
    ) => this.post(rawMutations, options, GraphQlRequestType.Mutation);
}

export { default as Field } from './util/Query/Field';
export { default as InlineFragment } from './util/Query/InlineFragment';

export default new Client();
