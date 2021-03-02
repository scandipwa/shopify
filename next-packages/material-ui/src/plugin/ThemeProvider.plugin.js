import { createElement } from 'react';

import ThemeProvider from '../component/ThemeProvider';

const addThemeProvider = (member) => [
    ...member,
    (children) => createElement(
        ThemeProvider,
        { key: 'material-ui' },
        children
    )
];

export default {
    'Framework/Component/App/Component': {
        'member-property': {
            contextProviders: addThemeProvider
        }
    }
};
