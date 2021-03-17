import { Field } from './Field';

/** @namespace Graphql/Util/Query/Fragment/Fragment */
export class Fragment extends Field {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(name: string) {
        super(name);

        this.name = `... on ${name}`;
    }
}
