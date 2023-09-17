import { assert } from 'chai';
import 'mocha';
import _ from 'lodash';
import {
  arrayToList,
  listToArray,
  deepEqual,
  range,
  sum,
  reverseArray,
  reverseArrayInPLace,
} from './ch-4-data-structures.js';

describe('The sum of range', function () {
  it('Returns 55, the sum of numbers ranged from 1 to 10', function () {
    assert.equal(sum(range(1, 10)), 55);
  });
});

describe('Reversing an array', function () {
  const array = range(1, 5);

  it('Returns a new reversed array', function () {
    const reversedArray = reverseArray(array);

    assert.deepEqual(reversedArray, [5, 4, 3, 2, 1]);
    assert.equal(reversedArray.at(0), 5);
    assert.equal(reversedArray.at(reversedArray.length - 1), 1);
  });

  it('Return reversed array in place', function () {
    const reversedArray = reverseArrayInPLace(array);

    assert.notEqual(reversedArray, [5, 4, 3, 2, 1]);
    assert.deepEqual(reversedArray, [5, 4, 3, 2, 1]);
    assert.equal(reversedArray.at(0), 5);
    assert.equal(reversedArray.at(reversedArray.length - 1), 1);
  });
});

describe('A list', function () {
  const array = range(1, 5);
  const list = arrayToList(array);

  it('Returns a list from an array', function () {
    assert.deepEqual(list, {
      value: 1,
      rest: {
        value: 2,
        rest: {
          value: 3,
          rest: {
            value: 4,
            rest: {
              value: 5,
              rest: null,
            },
          },
        },
      },
    });
  });

  it('Returns an array from a list', function () {
    assert.deepEqual(listToArray(list), range(1, 5));
  });
});

describe('Deep comparison', function () {
  it('Deep compare two value', function () {
    let symbol = Symbol();
    const value = {
      primitives: [
        'string',
        43e-9,
        2_000_000_000_000_000n,
        symbol,
        null,
        undefined,
        NaN,
        Infinity,
        -Infinity,
      ],
      objects: {
        object: {
          name: 'Sindu Andita Pratama',
          age: 33,
          gender: 'male',
          nationality: 'Indonesian',
          interests: ['music', 'reading', 'writing'],
        },
        array: ['HTML', 'CSS', 'JavaScript', 'React', 'NodeJs', 'MongoDb'],
        date: new Date(),
        function: function (x, y) {
          return x + y;
        },
      },
    };

    assert.equal(deepEqual(value, _.cloneDeep(value)), true);
  });
});
