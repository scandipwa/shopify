/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */
import React from 'react';

import('../util').then(({ dateToString }) => dateToString(new Date()));

export function TestPage() {
    return <div>Hello World</div>;
}

export default TestPage;
