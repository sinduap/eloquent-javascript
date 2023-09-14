//======== EXERCISES ========//

//===========================//
//== 1.LOOPING A TRIANGLES ==//
//===========================//
export function printTriangle(n = 7) {
  for (let i = 0; i <= n; i++) {
    console.log('#'.repeat(i));
  }
}

printTriangle();

//===========================//
//======= 2.FIZZBUZZ ========//
//===========================//

export function fizzBuzz(n = 100) {
  for (let i = 1; i <= n; i++) {
    const isFizz = i % 3 === 0;
    const isBuzz = i % 5 === 0;

    if (isFizz && isBuzz) console.log('Fizzbuzz');
    else if (isFizz) console.log('Fizz');
    else if (isBuzz) console.log('Buzz');
    else console.log(i);
  }
}

fizzBuzz();

//===========================//
//====== 3.CHESSBOARD =======//
//===========================//
export function printChessboard(size = 8) {
  // ROWS
  for (let i = 1; i <= size; i++) {
    let displayRow = '';
    // COLS
    for (let j = 1; j <= size; j++) {
      const isOddRow = i % 2 === 0;
      const isOddCol = j % 2 === 0;

      if (isOddRow) {
        displayRow += isOddCol ? '#' : ' ';
      } else {
        displayRow += isOddCol ? ' ' : '#';
      }
    }
    console.log(displayRow);
  }
}

printChessboard();
