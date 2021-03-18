/* eslint-disable */
import { Field } from './Field';
import { postQuery } from '../Request/Query';

const query = new Field('person')
    .addField('name')
    .addField('something')
    .addField('else')
    .addFieldList([
        'age',
        'occupation'
    ])
    .addField(
        new Field('mother')
            .addField('name')
            .addField('age')
    );

postQuery(query, {}).then((result) => result.mother.age);