export const NOT_FOUND_ERROR_CODE = 404;
export const BAD_REQUEST_ERROR_CODE = 400;

/** @namespace ShopifyNextjsApi/Util/ResponseHandler/setResponseError */
export const setResponseError = (res, statusCode) => {
    // eslint-disable-next-line no-param-reassign
    res.statusCode = statusCode;

    return res;
};

/** @namespace ShopifyNextjsApi/Util/ResponseHandler/handleError */
export const handleError = (res, statusCode, defaultProps = {}) => {
    setResponseError(res, statusCode);

    const responseData = {
        errorCode: statusCode
    };

    return {
        props: {
            ...defaultProps,
            responseData
        }
    };
};
