import SCRIPTS from './scripts.js';
//======= EXERCISES ========//

//==========================//
//======= 1.FLATTEN ========//
//==========================//
const arrays = [1, [2, [3]], [[4, 5]], [[6]]];

function flatten(arr) {
  return arr.reduce(
    (final, curr) =>
      Array.isArray(curr) ? [...final, ...flatten(curr)] : [...final, curr],
    []
  );
}

console.log(flatten(arrays));

//==========================//
//======= 2.HOF LOOP =======//
//==========================//
function loop(n, test, update, body) {
  let i;
  for (i = n; test(i); i = update(i)) {
    body(i);
  }
}
loop(
  3,
  n => n > 0,
  n => n - 1,
  console.log
);

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
  return !array.some(el => !predicate(el));
}

//====================================//
//=== 3.DOMINANT WRITING DIRECTION ===//
//====================================//

function getScriptForCode(code, data) {
  for (let script of data) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }

  return null;
}

function getDominantScript(text, data) {
  const scripts = [];

  for (const char of text) {
    const script = getScriptForCode(char.codePointAt(0), data);

    if (!script) continue;

    const { direction } = script;
    const scriptIndex = scripts.findIndex(s => s.direction === direction);

    if (scriptIndex >= 0) {
      scripts[scriptIndex].count++;
    } else {
      scripts.push({ direction, count: 1 });
    }
  }

  const dominantScript = scripts.reduce(
    (dominant, script) => (script.count > dominant.count ? script : dominant),
    scripts.at(0)
  );

  return `The dominant direction is ${dominantScript.direction}`;
}

console.log(
  getDominantScript(
    '英国的狗说"woof",مرحبا كيف حالي من اندونيسيا俄罗斯的狗说"тяв"',
    SCRIPTS
  )
);
