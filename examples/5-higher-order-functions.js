import SCRIPTS from './scripts.js';

let total = 0,
  count = 1;

while (count <= 10) {
  total += count;
  count += 1;
}

console.log(total);

function range(min, max) {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

function sum(nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(range(1, 10)));

for (let i = 0; i < 10; i++) {
  console.log(i);
}

function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}

function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});

console.log(labels);

function greaterThan(n) {
  return m => m > n;
}

let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

function noisy(f) {
  return (...args) => {
    console.log('calling with', args);
    let result = f(...args);
    console.log('called with', args, ', returned', result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);

function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2 == 1, () => {
    console.log(n, 'is even');
  });
});

['A', 'B'].forEach(l => console.log(l));

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == 'rtl');
console.log(map(rtlScripts, s => s.name));

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(
  SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  })
);

function getScriptFromCode(code, data) {
  for (let script of data) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }

  return null;
}

function getScriptFromChar(char, data) {
  return getScriptFromCode(char.codePointAt(0), data);
}

function getScriptPercentage(text, data) {
  const scripts = [];

  for (const char of text) {
    const script = getScriptFromChar(char, data);

    if (!script) continue;

    const { name } = script;
    const scriptIndex = scripts.findIndex(script => script.name === name);

    if (scriptIndex >= 0) {
      scripts[scriptIndex].count++;
    } else {
      scripts.push({ name, count: 1 });
    }
  }

  const totalCount = scripts.reduce(
    (total, scripts) => total + scripts.count,
    0
  );

  return scripts
    .sort((a, b) => b.count - a.count)
    .map(
      script =>
        `${Math.round((script.count / totalCount) * 100)}% ${script.name}`
    )
    .join(', ');
}

console.log(
  getScriptPercentage('ꦄꦏ꧀ꦰꦫꦩꦸꦑ英国的狗说"woof", 俄罗斯的狗说"тяв"', SCRIPTS)
);
