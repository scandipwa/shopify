/** @namespace Graphql/Util/Request/processHeaders */
export const processHeaders = (headers, { headers: additionalHeaders = {} }) => ({
    ...headers,
    ...additionalHeaders
});

/** @namespace Graphql/Util/Request/processEndpoint */
export const processEndpoint = ({ endpoint }) => endpoint;

/** @namespace Graphql/Util/Request/postFetch */
export const postFetch = (query, variables, options = {}) => fetch(
    processEndpoint(options),
    {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: processHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }, options)
    }
);

/** @namespace Graphql/Util/Request/checkForErrors */
export const checkForErrors = (res) => {
    const { errors, data } = res;

    if (errors) {
        // not throwing an error (we need Object as payload)
        throw errors;
    }

    return data;
};

/** @namespace Graphql/Util/Request/parseError */
export const parseError = (error) => {
    if (typeof error === 'string') {
        return error;
    }

    if (error.message) {
        return error.message;
    }

    if (error[0].message) {
        return error[0].message;
    }

    return __('Something went wrong');
};

/** @namespace Graphql/Util/Request/parseResponse */
export const parseResponse = async (request) => {
    try {
        const response = await request;
        const json = await response.json();
        return checkForErrors(json);
    } catch (e) {
        // throw new, formatted error instead
        throw new Error(parseError(e));
    }
};

/** @namespace Graphql/Util/Request/executePost */
export const executePost = (queryObject, options) => {
    const { query, variables } = queryObject;
    return parseResponse(postFetch(query, variables, options));
};
