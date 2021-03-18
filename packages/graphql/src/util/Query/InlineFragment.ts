import { FetchedFieldItemType, Field } from './Field';

/** @namespace Graphql/Util/Query/InlineFragment/InlineFragment */
export class InlineFragment<
    N extends string,
    RT extends Record<string, FetchedFieldItemType> = Record<string, FetchedFieldItemType>
> extends Field<N, RT> {
    readonly isInlineFragment: boolean = true;

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(name: N) {
        super(`... on ${name}` as N);
    }

    // STRING
    addField<S extends string>(field: S): InlineFragment<
        N,
        RT & { [K in S]: FetchedFieldItemType }
    >;

    // FIELD
    addField<S extends string, F extends Field<S>>(field: F): InlineFragment<
        N,
        RT & { [K in F['name']]: F['resultTypeHolder'] }
    >;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    addField(field: any): any {
        if (field instanceof InlineFragment) {
            throw new Error('Cannot add a Fragment on a Fragment!');
        }

        return super.addField(field);
    }

    setAlias<A extends string>(alias: A): InlineFragment<A, RT> {
        this.alias = `${alias}:`;

        return this as unknown as InlineFragment<A, RT>;
    }
}
