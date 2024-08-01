//====================================//
//========= 1.A VECTOR TYPE ==========//
//====================================//
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus({ x, y }) {
    return new Vec(this.x + x, this.y + y);
  }

  minus({ x, y }) {
    return new Vec(this.x - x, this.y - y);
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

//====================================//
//============= 2.GROUPS =============//
//====================================//
class Group {
  constructor(array = []) {
    this.group = array;
  }

  has(value) {
    return this.group.includes(value);
  }

  add(value) {
    if (!this.has(value)) {
      this.group.push(value);
    }
    return this;
  }

  delete(value) {
    if (this.has(value)) {
      this.group = this.group.filter(el => el !== value);
    }
    return this;
  }

  get size() {
    return this.group.length;
  }

  static from(array) {
    return new this(array);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

//====================================//
//======== 3. ITERABLE GROUPS ========//
//====================================//
class GroupIterator {
  constructor(group) {
    this.group = group;
  }

  next() {
    if (!this.group.size) {
      return { done: true };
    }

    const [curr, ...rest] = this.group.group;
    this.group = new Group(rest);
    return { value: curr, done: false };
  }
}

const group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}
