function speak(line) {
  console.log(`The ${this.type} rabbit says "${line}"`);
}

const whiteRabbit = { type: 'white', speak };
const hungryRabbit = { type: 'hungry', speak };

whiteRabbit.speak('Oh my fur and whiskers');
hungryRabbit.speak('Got any carrots?');

speak.call(whiteRabbit, 'Hurry');

const finder = {
  find(array) {
    return array.some(el => el === this.value);
  },
  value: 4,
};

console.log(finder.find([4, 5]));

const empty = {};
console.log(empty.toString);
console.log(empty.toString());

console.log(Object.getPrototypeOf({}) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype) === null);

console.log(Object.getPrototypeOf(Math.max) === Function.prototype);
console.log(Object.getPrototypeOf([]) === Array.prototype);

const protoRabbit = {
  speak(line) {
    console.log(`This ${this.type} rabbit says "${line}"`);
  },
};

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

const blackRabbit = makeRabbit('black');
blackRabbit.speak('I am fear and darkness');

class Rabbit {
  constructor(type) {
    this.type = type;
  }

  speak(line) {
    console.log(`This ${this.type} rabbit says "${line}"`);
  }
}

const killerRabbit = new Rabbit('killer');
killerRabbit.speak('I am so vile!');

function ArchaicRabbit(type) {
  this.type = type;
}

ArchaicRabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

const oldSchoolRabbit = new ArchaicRabbit('old school');

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// → true
console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);
// → true

Rabbit.prototype.toString = function () {
  return `${this.type} rabbit`;
};

console.log(String(killerRabbit));

const varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};

console.log(varyingSize.size);
console.log(varyingSize.size);

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

const temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30

const boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);
// → 100

class ListIterator {
  constructor(list) {
    this.list = list;
  }

  next() {
    if (!this.list) return { done: true };

    const { value, rest } = this.list;
    this.list = rest;
    return { value, done: false };
  }
}

class List {
  constructor(value, rest) {
    this.value = value;
    this.rest = rest;
  }

  get length() {
    return 1 + (this.rest?.length ?? 0);
  }

  static fromArray(array) {
    if (!array.length) return null;

    const [value, ...rest] = array;

    return new List(value, this.fromArray(rest));
  }

  [Symbol.iterator]() {
    return new ListIterator(this);
  }
}

const list = List.fromArray([1, 2, 3]);

console.log(list.length);

for (let element of list) {
  console.log(element);
}

class LengthList extends List {
  #length;

  constructor(value, rest) {
    super(value, rest);
    this.#length = super.length;
  }

  get length() {
    return this.#length;
  }
}

console.log(LengthList.fromArray([1, 2, 3]).length);
// → 3

console.log(new LengthList(1, null) instanceof LengthList);
// → true
console.log(new LengthList(2, null) instanceof List);
// → true
console.log(new List(3, null) instanceof LengthList);
// → false
console.log([1] instanceof Array);
// → true
