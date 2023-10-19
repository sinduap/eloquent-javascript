const script = document.createElement('script');
script.src = 'https://eloquentjavascript.net/code/scripts.js';
document.head.append(script);

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

script.addEventListener('load', () => {
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

  function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let name = groupName(item);
      let known = counts.findIndex(c => c.name == name);
      if (known == -1) {
        counts.push({ name, count: 1 });
      } else {
        counts[known].count++;
      }
    }
    return counts;
  }

  function textScripts(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.name : 'none';
    }).filter(({ name }) => name != 'none');
    let total = scripts.reduce((n, { count }) => n + count, 0);
    if (total == 0) return 'No scripts found';
    return scripts
      .map(({ name, count }) => {
        return `${Math.round((count * 100) / total)}% ${name}`;
      })
      .join(', ');
  }
  console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
});
