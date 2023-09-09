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
const isPrimitive = val => !(val instanceof Object);
const isObject = val => typeof val === 'object' && !Array.isArray(val);
const isArray = val => Array.isArray(val);

function deepEqual(obj1, obj2) {
  // Compare primitive
  if (isPrimitive(obj1) || isPrimitive(obj2)) return obj1 === obj2;

  // Compare object
  if (isObject(obj1)) {
    for (const key in obj1) {
      if (obj2[key] === undefined) return false;
      if (!isPrimitive(obj1[key])) return deepEqual(obj1[key], obj2[key]);
      if (obj1[key] !== obj2[key]) return false;
    }
    return true;
  }

  // Compare array
  if (isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    for (const [i, val] of obj1.entries()) {
      if (!isPrimitive(val)) return deepEqual(val, obj2.at(i));
      if (val !== obj2.at(i)) return false;
    }
    return true;
  }
}

console.log(deepEqual([[[]]], [[[]]]));
// → true
