import ApiClientContext, { ApiClient } from '../context/apiClient';

const addApiClientProvider = (member) => [
    ...member,
    (children) => (
        <ApiClientContext.Provider value={ new ApiClient() }>
            { children }
        </ApiClientContext.Provider>
    )
];

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            contextProviders: addApiClientProvider
        }
    }
};
