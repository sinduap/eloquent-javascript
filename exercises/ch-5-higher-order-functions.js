//======= EXERCISES ========//

//==========================//
//======= 1.FLATTEN ========//
//==========================//
function flatten(arr) {
  return arr.reduce(
    (acc, curr) =>
      Array.isArray(curr) ? acc.concat(...flatten(curr)) : acc.concat(curr),
    []
  );
}

//==========================//
//======= 2.HOF LOOP =======//
//==========================//
function loop(val, test, update, body) {
  let i;
  for (i = val; test(i); i = update(i)) {
    body(i);
  }
}

//==========================//
//====== 2.EVERYTHING ======//
//==========================//
function everyV1(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])) return false;
  }

  return true;
}

function everyV2(array, predicate) {
  return !array.some(val => !predicate(val));
}

//====================================//
//=== 3.DOMINANT WRITING DIRECTION ===//
//====================================//
