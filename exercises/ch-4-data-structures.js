//======= EXERCISES ========//

//==========================//
//=== 1.THE SUM OF RANGE ===//
//==========================//
export function range(from, to, step = 1) {
  const arr = [];
  for (let i = 0; i <= to - from; i = i + step) {
    arr.push(i + from);
  }
  return arr;
}

export function sum(nums) {
  let total = 0;
  for (const num of nums) {
    total += num;
  }
  return total;
}

console.log(sum(range(1, 10)));
// → 55

//==========================//
//== 2.REVERSING AN ARRAY ==//
//==========================//
export function reverseArray(array) {
  const arr = [];
  for (const el of array) {
    arr.unshift(el);
  }
  return arr;
}

const myArray = [1, 2, 3, 4, 5];
console.log(reverseArray(myArray));

export function reverseArrayInPLace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    const el = array[i];
    array[i] = array[array.length - i - 1];
    array[array.length - i - 1] = el;
  }

  return array;
}

const myNewArray = reverseArrayInPLace(myArray);
console.log(myArray === myNewArray);

//==========================//
//======== 3.A LIST ========//
//==========================//
export function arrayToList(arr) {
  const [value, ...restArr] = arr;
  return arr.length > 1
    ? { value, rest: arrayToList(restArr) }
    : { value, rest: null };
}

let myOtherArray = [1, 2, 3, 4, 5];
const myList = arrayToList(myOtherArray);
console.log(myList);

export function listToArray(list) {
  return list.rest ? [list.value, ...listToArray(list.rest)] : [list.value];
}

console.log(listToArray(myList));

//==========================//
//=== 4.DEEP COMPARISON ====//
//==========================//
export function deepEqual(a, b) {
  if (typeof a !== 'object' || a === null) return Object.is(a, b);

  const entriesA = Array.isArray(a) ? [...a.entries()] : Object.entries(a);
  const entriesB = Array.isArray(b) ? [...b.entries()] : Object.entries(b);

  if (entriesA.length !== entriesB.length) return false;

  for (const [key] of entriesA) {
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

let mySymbol;

console.log(
  deepEqual(
    {
      primitives: [
        'string',
        43e-9,
        2_000_000_000_000_000n,
        (mySymbol = Symbol()),
        null,
        undefined,
        NaN,
        Infinity,
        -Infinity,
        -0,
      ],
      'non-primitive': {
        object: {
          name: 'Sindu Andita Pratama',
          age: 33,
          gender: 'male',
          nationality: 'Indonesian',
          interests: ['music', 'reading', 'writing'],
        },
        array: ['HTML', 'CSS', 'JavaScript', 'React', 'NodeJs', 'MongoDb'],
      },
    },
    {
      primitives: [
        'string',
        43e-9,
        2_000_000_000_000_000n,
        mySymbol,
        null,
        undefined,
        NaN,
        Infinity,
        -Infinity,
        -0,
      ],
      'non-primitive': {
        object: {
          name: 'Sindu Andita Pratama',
          age: 33,
          gender: 'male',
          nationality: 'Indonesian',
          interests: ['music', 'reading', 'writing'],
        },
        array: ['HTML', 'CSS', 'JavaScript', 'React', 'NodeJs', 'MongoDb'],
      },
    }
  )
);

// → true
