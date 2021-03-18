import { FetchedFieldItemType, Field } from './Field';

// TODO
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

    addField(field: unknown): unknown {
        if (field instanceof InlineFragment) {
            throw new Error('Cannot add a Fragment on a Fragment!');
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return super.addField(field);
    }

    setAlias<A extends string>(alias: A): InlineFragment<A, RT> {
        this.alias = `${alias}:`;

        return this as unknown as InlineFragment<A, RT>;
    }
}
