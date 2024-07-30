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

const yellowRabbit = new Rabbit('yellow');
yellowRabbit.speak('I am so happy');
