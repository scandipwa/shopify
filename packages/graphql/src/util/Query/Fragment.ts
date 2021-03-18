import { FetchedFieldItemType, Field } from './Field';

// TODO
/** @namespace Graphql/Util/Query/Fragment/Fragment */
export class Fragment<
    N extends string,
    RT extends Record<string, FetchedFieldItemType>
> extends Field<N, RT> {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(name: N) {
        super(name);

        this.name = `... on ${name}`;
    }
}
