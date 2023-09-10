# Chapter 1 Values Types and Operator

- For example, we can express the number 13 in bits. It works the same way
  as a decimal number, but instead of 10 different digits, you have only 2, and
  the weight of each increases by a factor of 2 from right to left. Here are the
  bits that make up the number 13, with the weights of the digits shown below
  them:

  ```
    0   0   0   0   1   1   0   1
  128  64  32  16   8   4   2   1
  // → 00001101
  ```

  ## Values

  - To create a value, you must merely invoke its name.

  ## Numbers

  - Values of the number type are, unsurprisingly, numeric values. In a JavaScript
    program, they are written as follows:

    ```
    13
    ```

  - Fractional numbers are written by using a dot.

    ```
    9.81
    ```

  - For very big or very small numbers, you may also use scientific notation by
    adding an e (for exponent), followed by the exponent of the number.

    ```
    2.998e8
    ```

  - Calculations with whole numbers (also called integers) smaller than the
    aforementioned 9 quadrillion are guaranteed to always be precise. Unfortunately, calculations with fractional numbers are generally not.

    ### Arithmetic

    - The main thing to do with numbers is arithmetic. Arithmetic operations such
      as addition or multiplication take two number values and produce a new number
      from them.

      ```
      100 + 4 * 11
      ```

    - The + and \* symbols are called operators. The first stands for addition, and
      the second stands for multiplication. Putting an operator between two values
      will apply it to those values and produce a new value.

    - When operators appear together without parentheses, the order in which
      they are applied is determined by the precedence of the operators. The example
      shows that multiplication comes before addition. The / operator has the same
      precedence as \*. Likewise for + and -. When multiple operators with the same
      precedence appear next to each other, as in 1 - 2 + 1, they are applied left to
      right: (1 - 2)+ 1.

    - The % symbol is used to represent the remainder operation. X % Y
      is the remainder of dividing X by Y. For example, 314 % 100 produces 14, and
      144 % 12 gives 0. The remainder operator’s precedence is the same as that of
      multiplication and division. You’ll also often see this operator referred to as
      modulo.

    ### Special numbers

    - There are three special values in JavaScript that are considered numbers but
      don’t behave like normal numbers.

    - The first two are Infinity and -Infinity, which represent the positive and
      negative infinities. Infinity - 1 is still Infinity, and so on. Don’t put too
      much trust in infinity-based computation, though. It isn’t mathematically
      sound, and it will quickly lead to the next special number: NaN.

    - NaN stands for “not a number”, even though it is a value of the number type.
      You’ll get this result when you, for example, try to calculate 0 / 0 (zero divided
      by zero), Infinity - Infinity, or any number of other numeric operations that
      don’t yield a meaningful result.

  ## Strings

  - The next basic data type is the string. Strings are used to represent text. They
    are written by enclosing their content in quotes.

    ```
    `Down on the sea`
    "Lie on the ocean"
    'Float on the ocean'
    ```

  - To make it possible to include such characters in a string, the following
    notation is used: whenever a backslash (\) is found inside quoted text, it
    indicates that the character after it has a special meaning. This is called
    escaping the character.

  - A newline character is written like "\n".

    ```
    "This is the first line\nAnd this is the second"
    // →
    This is the first line
    And this is the second
    ```

  - Strings cannot be divided, multiplied, or subtracted, but the + operator can
    be used on them. It does not add, but it concatenates (glues two strings
    together).

    ```
    "con" + "cat" + "e" + "nate"
    // → concatenate
    ```

  - Strings written with single or double quotes behave very much the same,
    the only difference is in which type of quote you need to escape inside of them.
    Backtick-quoted strings, usually called template literals, can do a few more
    tricks. Apart from being able to span lines, they can also embed other values.

    ```
    `half of 100 is ${100 / 2}`
    // → half of 100 is 50
    ```

  ## Unary Operators

  - Not all operators are symbols. Some are written as words. One example is the
    typeof operator, which produces a string value naming the type of the value
    you give it.

    ```
    console.log(typeof 4.5)
    // → number
    console.log(typeof "x")
    // → string
    ```

  - Operators that use two values are called binary operators, while those that
    take one are called unary operators. The minus operator can be used both as
    a binary operator and as a unary operator.

    ```
    console.log(- (10 - 2))
    ```

  ## Boolean Values

  - JavaScript has a
    Boolean type, which has just two values, true and false, which are written as
    those words.

    ### Comparison

    - Here is one way to produce Boolean values:
      ```
      console.log(3 > 2)
      // → true
      console.log(3 < 2)
      // → false
      ```
    - Strings can be compared in the same way. When comparing strings, JavaScript goes over the
      characters from left to right, comparing the Unicode codes one by one.

      ```
      console.log("Aardvark" < "Zoroaster")
      // → true
      ```

    - Other similar operators are >= (greater than or equal to), <= (less than or
      equal to), == (equal to), and != (not equal to).

      ```
      console.log("Itchy" != "Scratchy")
      // → true
      console.log("Apple" == "Orange")
      // → false
      ```

    - There is only one value in JavaScript that is not equal to itself, and that is
      NaN (“not a number”).

      ```
      console.log(NaN == NaN)
      // → false
      ```

    ### Logical Operators

    - There are also some operations that can be applied to Boolean values themselves. JavaScript supports three logical operators: and, or, and not.

    - The && operator represents logical and. It is a binary operator, and its result
      is true only if both the values given to it are true.

      ```
      console.log(true && false)
      // → false
      console.log(true && true)
      // → true
      ```

    - The || operator denotes logical or. It produces true if either of the values
      given to it is true.

      ```
      console.log(false || true)
      // → true
      console.log(false || false)
      // → false
      ```

    - Not is written as an exclamation mark (!). It is a unary operator that flips
      the value given to it—!true produces false, and !false gives true.

    - This one is called the conditional operator (or sometimes just the ternary
      operator since it is the only such operator in the language). The value on the
      left of the question mark “picks” which of the other two values will come out.
      When it is true, it chooses the middle value, and when it is false, it chooses the
      value on the right

      ````
      console.log(true ? 1 : 2);
      // → 1
      console.log(false ? 1 : 2);
      // → 2```
      ````

  ## Empty Values

  - There are two special values, written null and undefined, that are used to
    denote the absence of a meaningful value. They are themselves values, but
    they carry no information.

  - The difference in meaning between undefined and null is an accident of
    JavaScript’s design, and it doesn’t matter most of the time. In cases where
    you actually have to concern yourself with these values, I recommend treating
    them as mostly interchangeable.

  ## Automatic Type Conversion

  - When an operator is applied to the “wrong” type of value, JavaScript will
    quietly convert that value to the type it needs, using a set of rules that often
    aren’t what you want or expect. This is called type coercion. The null in the
    first expression becomes 0, and the "5" in the second expression becomes 5
    (from string to number). Yet in the third expression, + tries string concatenation before numeric addition, so the 1 is converted to "1" (from number to
    string).

    ```
    console.log(8 * null)
    // → 0
    console.log("5" - 1)
    // → 4
    console.log("5" + 1)
    // → 51
    console.log("five" * 2)
    // → NaN
    console.log(false == 0)
    // → true
    ```

    ### Short-circuiting of Logical Operators

  ## Summary
