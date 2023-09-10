//======= EXERCISES ========//

//==========================//
//=== 1.THE SUM OF RANGE ===//
//==========================//
function range(from, to) {
  const iterable = {
    length: to - from + 1,
  };
  return Array.from(iterable, (_n, i) => from + i);
}

function sum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(range(1, 10)));
// → 55

//==========================//
//== 2.REVERSING AN ARRAY ==//
//==========================//
function reverseArray(arr) {
  return [...arr].reverse();
}

function reverseArrayInPLace(arr) {
  return arr.reverse();
}

let myArray = [1, 2, 3, 4, 5];
const myNewArray = reverseArrayInPLace(myArray);

console.log(myArray);
console.log(myNewArray);

//==========================//
//======== 3.A LIST ========//
//==========================//
function arrayToList(arr) {
  if (arr.length === 1) return { value: arr.shift(), rest: null };
  return { value: arr.shift(), rest: arrayToList(arr) };
}

let myOtherArray = [1, 2, 3, 4, 5];
const myList = arrayToList(myOtherArray);

console.log(myList);

function listToArray(list) {
  if (list.rest === null) return [list.value];
  else return [list.value, ...listToArray(list.rest)];
}

console.log(listToArray(myList));

//==========================//
//=== 4.DEEP COMPARISON ====//
//==========================//
function equalPrimitives(prim1, prim2) {
  return (
    (Number.isNaN(prim1) && Number.isNaN(prim2)) || Object.is(prim1, prim2)
  );
}

function deepEqual(val1, val2) {
  if (typeof val1 !== typeof val2) return false;

  if (typeof val1 !== 'object' || val1 === null)
    return equalPrimitives(val1, val2);

  if (Array.isArray(val1)) {
    if (val1.length !== val2.length) return false;

    for (const [i, el] of val1.entries()) {
      if (!deepEqual(el, val2.at(i))) return false;
    }
  } else {
    if (Object.entries(val1).length !== Object.entries(val2).length)
      return false;

    for (const key in val1) {
      if (!deepEqual(val1[key], val2[key])) return false;
    }
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
