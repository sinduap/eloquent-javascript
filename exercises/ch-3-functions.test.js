import { assert } from 'chai';
import { min, isEven, countBs, countChar } from './ch-3-functions.js';
import { describe } from 'mocha';

describe('Minimum', function () {
  it('Should return -100', function () {
    assert.equal(min(10, -100), -100);
  });

  it('Should return 0', function () {
    assert.equal(min(0, 3, 100), 0);
  });

  it('Should return 9', function () {
    assert.equal(min(9, 10, 9, 88), 9);
  });
});

describe('Recursion', function () {
  it('Should return true', function () {
    assert.equal(isEven(99), false);
  });

  it('Should return false', function () {
    assert.equal(isEven(98), true);
  });
});

describe('Recursion', function () {
  it('Should return true', function () {
    assert.equal(isEven(99), false);
  });

  it('Should return false', function () {
    assert.equal(isEven(98), true);
  });
});

describe('Bean Counting', function () {
  it('Should return 2', function () {
    assert.equal(countBs('BBC'), 2);
  });

  it('Should return 4', function () {
    assert.equal(countChar('Sindu Andita Pratama', 'a'), 4);
  });
});
