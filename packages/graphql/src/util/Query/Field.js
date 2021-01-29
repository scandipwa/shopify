/** @namespace Graphql/Util/Query/Field/Field */
export class Field {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(name) {
        this.alias = '';
        this.children = [];
        this.args = [];
        this.addField = (field) => {
            if (typeof field === 'string') {
                this.children.push(new Field(field));
            } else if (field instanceof Field) {
                this.children.push(field);
            }

            return this;
        };
        this.name = name;
    }

    setAlias(alias) {
        this.alias = `${alias}:`;
        return this;
    }

    addFieldList(fieldList) {
        fieldList.forEach(this.addField);
        return this;
    }

    addArgument(name, type, value) {
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
