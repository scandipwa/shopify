export interface Argument {
    name: string;
    type: string;
    value: string;
}

/** @namespace Graphql/Util/Query/Field/Field */
export class Field {
    name: string;

    alias = '';

    children: Array<Field> = [];

    args: Array<Argument> = [];

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(name: string) {
        this.name = name;
    }

    setAlias(alias: string): Field {
        this.alias = `${alias}:`;
        return this;
    }

    addField = (field: string | Field): Field => {
        if (typeof field === 'string') {
            this.children.push(new Field(field));
        } else if (field instanceof Field) {
            this.children.push(field);
        }

        return this;
    };

    addFieldList(fieldList: Array<Field | string>): Field {
        fieldList.forEach(this.addField);
        return this;
    }

    addArgument(name: string, type: string, value: string): Field {
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
}
