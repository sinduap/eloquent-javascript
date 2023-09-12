/* let theNumber = Number(prompt('Pick a number'));
if (theNumber) {
  alert(`Your number is the square root of ${theNumber ** 2}`);
} else {
  alert("Hey why didn't you give me a number?");
}
*/
// =============================================

if (1 + 1 === 2) console.log("It's true");

// =============================================
/*
let num = Number(prompt('Pick a number'));

if (num < 10) console.log('Small');
else if (num < 100) console.log('Medium');
else console.log('Large');
*/
// =============================================

let number = 0;
while (number <= 12) {
  console.log(number);
  number += 2;
}

// =============================================

let baseNumber = 2;
let n = 10;
let results = 1;
while (n > 0) {
  results *= baseNumber;
  n--;
}

console.log(results);
// → 1024

// =============================================

/*
let username;
do {
  username = prompt("What's your name?");
} while (!username);

alert(`Hello ${username}`);
*/

// =============================================

let total = 1;
for (let i = 0; i < 10; i++) {
  total *= 2;
}

console.log(total);
// → 1024

// =============================================

let result;

for (let curr = 20; ; curr++) {
  if (curr % 7 === 0) {
    result = curr;
    break;
  }
}

console.log(result);
// → 21

// =============================================

/*
switch (prompt('What is the weather like?')) {
  case 'rainy':
    console.log('Remember tobring umbrella.');
    break;
  case 'sunny':
    console.log('Dress lightly.');
    break;
  case 'cloudy':
    console.log('Go outside.');
    break;
  default:
    console.log('Unknown weather type');
}
*/
