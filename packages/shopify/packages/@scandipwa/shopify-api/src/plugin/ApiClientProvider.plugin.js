import { createElement } from 'react';

import ApiClientContext, { ApiClient } from '../apiClient';

const addApiClientProvider = (member) => [
    ...member,
    (children) => createElement(
        ApiClientContext.Provider,
        { value: new ApiClient() },
        children
    )
];

export default {
    'Framework/Component/App/Component': {
        'member-property': {
            contextProviders: addApiClientProvider
        }
    }
};
