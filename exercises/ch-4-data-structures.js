//======= EXERCISES ========//

//==========================//
//=== 1.THE SUM OF RANGE ===//
//==========================//
export function range(from, to) {
  const iterable = {
    length: to - from + 1,
  };
  return Array.from(iterable, (_n, i) => from + i);
}

export function sum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(range(1, 10)));
// → 55

//==========================//
//== 2.REVERSING AN ARRAY ==//
//==========================//
export function reverseArray(arr) {
  return [...arr].reverse();
}

export function reverseArrayInPLace(arr) {
  return arr.reverse();
}

let myArray = [1, 2, 3, 4, 5];
const myNewArray = reverseArrayInPLace(myArray);

console.log(myArray);
console.log(myNewArray);

//==========================//
//======== 3.A LIST ========//
//==========================//
export function arrayToList(arr) {
  if (arr.length === 1) return { value: arr.shift(), rest: null };
  return { value: arr.shift(), rest: arrayToList(arr) };
}

let myOtherArray = [1, 2, 3, 4, 5];
const myList = arrayToList(myOtherArray);

console.log(myList);

export function listToArray(list) {
  if (list.rest === null) return [list.value];
  else return [list.value, ...listToArray(list.rest)];
}

console.log(listToArray(myList));

//==========================//
//=== 4.DEEP COMPARISON ====//
//==========================//
const equalPrimitives = (val1, val2) =>
  (Number.isNaN(val1) && Number.isNaN(val2)) || Object.is(val1, val2);

export function deepEqual(val1, val2) {
  if (typeof val1 !== typeof val2) return false;

  if (typeof val1 !== 'object' || val1 === null)
    return equalPrimitives(val1, val2);

  if (Object.entries(val1).length !== Object.entries(val2).length) return false;

  for (const [key, val] of Object.entries(val1)) {
    if (!deepEqual(val, val2[key])) return false;
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
      ],
      reverences: {
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
      ],
      reverences: {
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
