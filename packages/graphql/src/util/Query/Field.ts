export interface Argument {
    name: string;
    type: string;
    value: string;
}

export interface IField {
    name: string,
    alias: string,
    children: IField[],
    args: Argument[],

    setAlias,
    addArgument,
    addField,
    addFieldList

    resultTypeHolder
}

// TODO
// Workaround. Should be improved when partial type inference is supported by TS.
export type FetchedFieldItemType = string | number | null;

// TODO
// * fragments
// * returned field typings

/** @namespace Graphql/Util/Query/Field/Field */
export class Field<
    N extends string,
    RT extends Record<string, FetchedFieldItemType> = Record<string, FetchedFieldItemType>
> implements IField {
    /**
     * Type of name is changeable by setting an alias onto it.
     * The actual value of name is immutable.
     */
    readonly name: N;

    alias = '';

    children: IField[] = [];

    args: Argument[] = [];

    resultTypeHolder: RT;

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(name: N) {
        this.name = name;
    }

    /**
     * This function will change type of the Field such way that it'll seem that the name has changed.
     * The name is immutable and therefore will not actually get changed.
     * This illusion is implemented so that you have proper typings for the queries' return values
     */
    setAlias<A extends string>(alias: A): Field<A, RT> {
        this.alias = `${alias}:`;

        return this as unknown as Field<A, RT>;
    }

    addArgument(name: string, type: string, value: string): Field<N, RT> {
        if (value === undefined) {
            // allow passing in all potential arguments
            return this;
        }
        this.args.push({
            name,
            type,
            value
        });

        return this;
    }

    addField<S extends string, F extends Field<S>>(field: F): Field<
        N,
        RT & { [K in F['name']]: F['resultTypeHolder'] }
    >;

    addField<S extends string>(field: S): Field<
        N,
        RT & { [K in S]: FetchedFieldItemType }
    >;

    addField(field: unknown): unknown {
        if (typeof field === 'string') {
            this.children.push(new Field(field));
        } else if (field instanceof Field) {
            this.children.push(field);
        } else {
            throw new Error('Unknown field type!');
        }

        return this;
    }

    // TODO support strings mixed with fields
    addFieldList<S extends string>(fieldList: S[]): Field<
        N,
        RT & { [K in S]: FetchedFieldItemType }
    > {
        fieldList.forEach(this.addField);
        return this;
    }
}
