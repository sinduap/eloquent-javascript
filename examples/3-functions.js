// function expression
const square = function (x) {
  return x * x;
};
// function declaration
function rootSquare(x) {
  return Math.sqrt(x);
}
console.log(square(5));
// → 25
console.log(rootSquare(25));
// → 5

// =============================================

const makeNoise = function () {
  console.log('Pling!');
};

function power(base, exponent) {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }
  return result;
}

makeNoise();
// → Pling!
console.log(power(2, 10));
// → 1024

// =============================================

function makePizza(factor) {
  function ingredient(amount, unit, name) {
    let ingredientAmout = factor * amount;
    console.log(
      `${ingredientAmout} ${`${unit}${
        ingredientAmout > 1 ? 's' : ''
      }`} of ${name}.`
    );
  }
  ingredient(1, 'kg', 'Wheat flour');
  ingredient(1, 'teaspoon', 'Salt');
  ingredient(1 / 2, 'cup', 'Water');
  ingredient(1 / 2, 'pound', 'Mozzarella cheese');
  ingredient(1, 'tablespoon', 'Olive oil');
  ingredient(3, 'tablespoon', 'Tomato paste');
  ingredient(1, 'bunch', 'basil');
}

makePizza(4);

// =============================================

function powerRecursion(base, exponent) {
  return exponent === 1 ? base : powerRecursion(base, exponent - 1) * base;
}

console.log(powerRecursion(2, 10));
// → 1024

// =============================================

/* PUZZLE: by starting from the number 1 and repeatedly either
adding 5 or multiplying by 3, an infinite set of numbers can be produced. */

function findSolution(target) {
  function find(current, history) {
    if (current === target) return history;
    if (current > target) return null;
    if (current < target)
      return (
        find(current + 5, `(${history} + 5)`) ||
        find(current * 3, `(${history} * 3)`)
      );
  }

  return find(1, '1');
}

console.log(findSolution(99));
// → ((((1 + 5) + 5) * 3) * 3)

/*
ILUSTRATION:

find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big
      find(33, "(((1 + 5) + 5) * 3)")
        too big
    find(18, "((1 + 5) * 3)")
      too big
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!
*/

// =============================================

function zeroPad(num, width = 3) {
  let result = String(num);
  while (result.length < width) {
    result = '0' + result;
  }
  return result;
}

function printZeroPaddedWithLabel(num, label) {
  if (num === undefined) return;
  let result = String(num);
  while (result.length < 3) {
    result = '0' + result;
  }
  console.log(result + ' ' + label);
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory(3, 4, 0);
