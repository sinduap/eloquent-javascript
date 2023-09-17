# Chapter 3 Functions

- Functions are the bread and butter of JavaScript programming. The concept
  of wrapping a piece of program in a value has many uses. It gives us a way
  to structure larger programs, to reduce repetition, to associate names with
  subprograms, and to isolate these subprograms from each other.

- The most obvious application of functions is defining new vocabulary.
  Creating new words in prose is usually bad style. But in programming, it is
  indispensable.

  ## Defining a function

  - A function definition is a regular binding where the value of the binding is
    a function. For example, this code defines square to refer to a function that
    produces the square of a given number:

    ```
    function square(x) {
        return x * x;
    }

    console.log(square(4));
    // → 144
    ```

  - A function is created with an expression that starts with the keyword function
    . Functions have a set of parameters (in this case, only x) and a body, which
    contains the statements that are to be executed when the function is called.
    The function body of a function created this way must always be wrapped in
    braces, even when it consists of only a single statement.

  - A function can have multiple parameters or no parameters at all.

  - Some functions produce a value, such as power and square, and some don’t,
    whose only result is a side effect. A return statement determines the value
    the function returns. When control comes across such statement, it immediately
    jumps out of the current function and gives the returned value to the code that
    called the function. A return keyword without an expression after it will cause
    the function to return undefined.

  - Parameters to a function behave like regular bindings, but their initial values
    are given by the caller of the function, not the code in the function itself.

  ## Bindings and scopes

  - Each binding has a scope, which is the part of the program in which the binding
    is visible. For bindings defined outside of any function or block, the scope is
    the whole program—you can refer to such bindings wherever you want. These
    are called global.

  - But bindings created for function parameters or declared inside a function
    can be referenced only in that function, so they are known as local bindings.

  - Every time the function is called, new instances of these bindings are created.
    This provides some isolation between functions—each function call acts in its
    own little world (its local environment) and can often be understood without
    knowing a lot about what’s going on in the global environmen

  - Bindings declared with let and const are in fact local to the block that they
    are declared in, so if you create one of those inside of a loop, the code before and
    after the loop cannot “see” it.

  - In pre-2015 JavaScript, only functions created
    new scopes, so old-style bindings, created with the var keyword, are visible
    throughout the whole function that they appear in—or throughout the global
    scope, if they are not in a function.

    ```
    let x = 10;

    if (true) {
        let y = 20;
        var z = 30;
        console.log(x + y + z);
        // → 60
    }

    // y is not visible here
    console.log(x + z);
    // → 40
    ```

  - Each scope can “look out” into the scope around it, so x is visible inside the
    block in the example. The exception is when multiple bindings have the same
    name—in that case, code can see only the innermost one. For example, when
    the code inside the halve function refers to n, it is seeing its own n, not the
    global n.

    ```
    const halve = function(n) {
        return n / 2;
    };
    let n = 10;
    console.log(halve(100));
    // → 50
    console.log(n);
    // → 10
    ```
