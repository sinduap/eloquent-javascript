import SCRIPTS from './scripts.js';
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

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }

  return null;
}

function groupBy(array, prop) {
  return array
    .map(s => s[prop])
    .reduce(
      (acc, curr) =>
        acc[curr] ? { ...acc, [curr]: acc[curr] + 1 } : { ...acc, [curr]: 1 },
      {}
    );
}

function getDominantWriting(text) {
  let scriptsOfText = [];

  for (const char of text) {
    const script = characterScript(char.codePointAt(0));
    script && scriptsOfText.push(script);
  }

  const directionCount = groupBy(scriptsOfText, 'direction');

  let currDominant;

  for (const key in directionCount) {
    if (!currDominant) {
      currDominant = key;
    } else {
      currDominant =
        directionCount[currDominant] < directionCount[key] ? key : currDominant;
    }
  }

  return `The dominant direction is ${currDominant}`;
}

console.log(
  getDominantWriting(
    '英国的狗说"woof",مرحبا كيف حالي من اندونيسيا俄罗斯的狗说"тяв"'
  )
);
