//===== EXERCISES ===== //

//======================//
//===== 1.MINIMUM ======//
//======================//

export function min(a, b) {
  return a - b > a + b ? b : a;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

//======================//
//==== 2.RECURSION =====//
//======================//

export function isEven(num) {
  if (num < 0) throw new Error("Num can't be negative");
  return num > 2 ? isEven(num - 2) : num % 2 === 0;
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
try {
  // console.log(isEven(-1));
} catch (err) {
  console.log(err);
}
// → error Num can't be negative

//=======================//
//=== 3.BEAN COUNTING ===//
//=======================//
export function countBs(str) {
  let count = 0;
  for (const el of str) {
    if (el === 'B') count++;
  }
  return count;
}

export function countChar(str, char) {
  let count = 0;
  for (const el of str) {
    if (el === char) count++;
  }
  return count;
}

console.log(countBs('BBC'));
// → 2
console.log(countChar('kakkerlak', 'k'));
// → 4
