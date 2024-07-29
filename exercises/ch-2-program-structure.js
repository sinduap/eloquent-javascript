//======== EXERCISES ========//

//===========================//
//== 1.LOOPING A TRIANGLES ==//
//===========================//
export function printTriangle(n) {
  for (let i = 0; i <= n; i++) {
    console.log('#'.repeat(i));
  }
}

printTriangle(7);

//===========================//
//======= 2.FIZZBUZZ ========//
//===========================//

export function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    let word = i;

    if (i % 3 === 0 && i % 5 === 0) {
      word = 'FizzBuzz';
    } else if (i % 3 === 0 && i % 5 !== 0) {
      word = 'Fizz';
    } else if (i % 5 === 0 && i % 3 !== 0) {
      word = 'Buzz';
    }

    console.log(word);
  }
}

fizzBuzz(100);

//===========================//
//====== 3.CHESSBOARD =======//
//===========================//
export function printChessboard(size) {
  for (let i = 0; i < size; i++) {
    let row = '';

    for (let j = 0; j < size; j++) {
      if (i % 2 === 0) {
        row += j % 2 === 0 ? '#' : ' ';
      } else {
        row += j % 2 === 0 ? ' ' : '#';
      }
    }

    console.log(row);
  }
}

printChessboard(8);
