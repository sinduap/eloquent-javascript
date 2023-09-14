import { expect } from 'chai';
import { describe } from 'mocha';
import 'mocha-sinon';
import {
  printTriangle,
  fizzBuzz,
  printChessboard,
} from './ch-2-program-structure.js';

describe('Chapter 2 Program Structure', function () {
  beforeEach(function () {
    this.sinon.spy(console, 'log');
  });

  it('Should print triangle', function () {
    printTriangle();

    expect(console.log.calledWith('#')).to.be.true;
    expect(console.log.calledWith('##')).to.be.true;
    expect(console.log.calledWith('###')).to.be.true;
    expect(console.log.calledWith('####')).to.be.true;
    expect(console.log.calledWith('#####')).to.be.true;
    expect(console.log.calledWith('######')).to.be.true;
    expect(console.log.calledWith('#######')).to.be.true;
  });

  it('should log "Number, Fizz, Buzz, Fizzbuzz', function () {
    fizzBuzz(100);

    expect(console.log.calledWith('Fizz')).to.be.true;
    expect(console.log.calledWith('Buzz')).to.be.true;
    expect(console.log.calledWith('Fizzbuzz')).to.be.true;
  });

  it('should print chessboard with 8 rows and columns', function () {
    printChessboard(8);

    expect(console.log.calledWith(' # # # #')).to.be.true;
    expect(console.log.calledWith('# # # # ')).to.be.true;
  });
});
