//===== EXERCISES ===== //

//======================//
//===== 1.MINIMUM ======//
//======================//

export function min(...args) {
  return args.reduce((acc, curr) => {
    return curr < acc ? curr : acc;
  }, Infinity);
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
  if (num === 0) return true;
  if (num === 1) return false;
  if (num > 1) return isEven(num - 2);
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
  return Array.from(str).reduce((acc, curr) => {
    return curr === 'B' ? acc + 1 : acc;
  }, 0);
}

export function countChar(str, char) {
  return Array.from(str).reduce((acc, curr) => {
    return curr === char ? acc + 1 : acc;
  }, 0);
}

console.log(countBs('BBC'));
// → 2
console.log(countChar('kakkerlak', 'k'));
// → 4
