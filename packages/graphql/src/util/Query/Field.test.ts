/* eslint-disable */
import { Field } from './Field';
import { InlineFragment } from './InlineFragment';

const person = new Field('person')
    .addField('name')
    .addField('surname');

const mother = new Field('mother')
    .addField('name')
    .addField('surname')
    .addField('birthgivingAge');

const lumberjack = new InlineFragment('Male')
    .addField('beard')
    .addField('moustache')
    .addField(
        new InlineFragment('Female')
            .addField('something')
    );

const inhabitant = person
    .addFieldList([
        'nationality',
        'country',
        'city'
    ]);

/** Nesting */

const son = person.addField(mother);

const beardedperson = person.addField(lumberjack);

/** Results */

// Simple field test
person.resultTypeHolder.name;
// Should throw on this
person.resultTypeHolder.height;

// FieldList test
inhabitant.resultTypeHolder.city;

// Nested field test
son.resultTypeHolder.mother.birthgivingAge;

// Fragment test
beardedperson.resultTypeHolder.moustache;