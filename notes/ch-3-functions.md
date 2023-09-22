# Chapter 3 Functions

- Functions are the bread and butter of JavaScript programming. The concept of wrapping a piece of program in a value has many uses. It gives us a way to structure larger programs, to reduce repetition, to associate names with subprograms, and to isolate these subprograms from each other.

- The most obvious application of functions is defining new vocabulary. Creating new words in prose is usually bad style. But in programming, it is indispensable.

  ## Defining a function

  - A function definition is a regular binding where the value of the binding is a function. For example, this code defines square to refer to a function that produces the square of a given number:

    ```
    function square(x) {
      return x * x;
    }

    console.log(square(4));
    // → 144
    ```

  - A function is created with an expression that starts with the keyword function. Functions have a set of parameters (in this case, only x) and a body, which contains the statements that are to be executed when the function is called. The function body of a function created this way must always be wrapped in braces, even when it consists of only a single statement.

  - A function can have multiple parameters or no parameters at all.

  - Some functions produce a value, such as power and square, and some don’t,whose only result is a side effect. A return statement determines the value the function returns. When control comes across such statement, it immediately jumps out of the current function and gives the returned value to the code that called the function. A return keyword without an expression after it will cause the function to return undefined.

  - Parameters to a function behave like regular bindings, but their initial values are given by the caller of the function, not the code in the function itself.

  ## Bindings and scopes

  - Each binding has a scope, which is the part of the program in which the binding is visible. For bindings defined outside of any function or block, the scope is the whole program—you can refer to such bindings wherever you want. These are called global.

  - But bindings created for function parameters or declared inside a function can be referenced only in that function, so they are known as local bindings.

  - Every time the function is called, new instances of these bindings are created. This provides some isolation between functions—each function call acts in its own little world (its local environment) and can often be understood without knowing a lot about what’s going on in the global environment

  - Bindings declared with let and const are in fact local to the block that they are declared in, so if you create one of those inside of a loop, the code before and after the loop cannot “see” it.

  - In pre-2015 JavaScript, only functions created new scopes, so old-style bindings, created with the var keyword, are visible throughout the whole function that they appear in—or throughout the global scope, if they are not in a function.

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

  - Each scope can “look out” into the scope around it, so x is visible inside the block in the example. The exception is when multiple bindings have the same name—in that case, code can see only the innermost one. For example, when the code inside the halve function refers to n, it is seeing its own n, not the global n.

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

  ## Nested scope

  - JavaScript distinguishes not just global and local bindings. Blocks and functions can be created inside other blocks and functions, producing multiple degrees of locality.

    ```
    const hummus = function(factor) {
      const ingredient = function(amount, unit, name) {
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
        unit += "s";
        }
        console.log(`${ingredientAmount} ${unit} ${name}`);
      };
      ingredient(1, "can", "chickpeas");
      ingredient(0.25, "cup", "tahini");
      ingredient(0.25, "cup", "lemon juice");
      ingredient(1, "clove", "garlic");
      ingredient(2, "tablespoon", "olive oil");
      ingredient(0.5, "teaspoon", "cumin");
    };
    ```

  - The code inside the ingredient function can see the factor binding from the outer function. But its local bindings, such as unit or ingredientAmount, are not visible in the outer function.

  - The set of bindings visible inside a block is determined by the place of that block in the program text. Each local scope can also see all the local scopes that contain it, and all scopes can see the global scope. This approach to binding visibility is called lexical scoping.

  ## Functions as values

  - A function binding usually simply acts as a name for a specific piece of the program. Such a binding is defined once and never changed. This makes it easy to confuse the function and its name.

  - But the two are different. A function value can do all the things that values can do—you can use it in arbitrary expressions, not just call it. It is possible to store a function value in a new binding, pass it as an argument to a function, and so on. Similarly, a binding that holds a function is still just a regular binding and can, _if not constant_, be assigned a new value, like so:

    ```
    let launchMissiles = function() {
      missileSystem.launch("now");
    };
    if (safeMode) {
      launchMissiles = function() {/* do nothing */};
    }
    ```

  ## Declaration notation

  - There is a slightly shorter way to create a function binding. When the function keyword is used at the start of a statement, it works differently.

    ```
    function square(x) {
      return x * x;
    }
    ```

  - This is a function declaration. The statement defines the binding square and points it at the given function. It is slightly easier to write and doesn’t require a semicolon after the function. There is one subtlety with this form of function definition.

    ```
    console.log("The future says:", future());

    function future() {
      return "You'll never have flying cars";
    }
    ```

  - The preceding code works, even though the function is defined below the code that uses it. Function declarations are not part of the regular top-to-bottom flow of control. They are conceptually moved to the top of their scope and can be used by all the code in that scope. This is sometimes useful because it offers the freedom to order code in a way that seems meaningful, without worrying about having to define all functions before they are used.

  ## Arrow functions

  - There’s a third notation for functions, which looks very different from the others. Instead of the function keyword, it uses an arrow (=>) made up of an equal sign and a greater-than character.

  - The arrow comes after the list of parameters and is followed by the function’s body. It expresses something like “this input (the parameters) produces this result (the body)”.

  - When there is only one parameter name, you can omit the parentheses around the parameter list. If the body is a single expression, rather than a block in braces, that expression will be returned from the function. So, these two definitions of square do the same thing:

    ```
    const square1 = (x) => { return x * x; };
    const square2 = x => x * x;
    ```

  - When an arrow function has no parameters at all, its parameter list is just an empty set of parantheses.

    ```
    const horn = () => {
      console.log("Toot");
    };
    ```

  - Arrow functions were added in 2015, mostly to make it possible to write small function expressions in a less verbose way.

  ## The call stack

  - The way control flows through functions is somewhat involved. Let’s take a closer look at it. Here is a simple program that makes a few function calls:

    ```
    function greet(who) {
      console.log("Hello " + who);
    }
    greet("Harry");
    console.log("Bye");

    ```

  - A run through this program goes roughly like this: the call to greet causes control to jump to the start of that function (line 2). The function calls console.log, which takes control, does its job, and then returns control to line 2. Thereit reaches the end of the greet function, so it returns to the place that called it,which is line 4. The line after that calls console.log again. After that returns, the program reaches its end. We could show the flow of control schematically like this:

    ```
    not in function
      in greet
        in console.log
      in greet
    not in function
      in console.log
    not in function
    ```

  - Because a function has to jump back to the place that called it when it returns, the computer must remember the context from which the call happened. In one case, console.log has to return to the greet function when it is done. In the other case, it returns to the end of the program.

  - The place where the computer stores this context is the _call stack_. Everytime a function is called, the current context is stored on top of this stack. When a function returns, it removes the top context from the stack and uses that context to continue execution.

  - Storing this stack requires space in the computer’s memory. When the stack grows too big, the computer will fail with a message like “out of stack space” or “too much recursion”. The following code illustrates this by asking the computer a really hard question that causes an infinite back-and-forth between two functions. Rather, it would be infinite, if the computer had an infinite stack. As it is, we will run out of space, or “blow the stack”.

    ```
    function chicken() {
      return egg();
    }
    function egg() {
      return chicken();
    }
    console.log(chicken() + " came first.");
    // → ??
    ```

  ## Optional arguments

  - The following code is allowed and executes without any problem:

    ```
    function square(x) { return x * x; }
    console.log(square(4, true, "hedgehog"));
    // → 16
    ```

  - We defined square with only one parameter. Yet when we call it with three, the language doesn’t complain. It ignores the extra arguments and computes the square of the first one

  - JavaScript is extremely broad-minded about the number of arguments you pass to a function. If you pass too many, the extra ones are ignored. If you pass too few, the missing parameters get assigned the value undefined.

  - The downside of this is that it is possible—likely, even—that you’ll accidentally pass the wrong number of arguments to functions. And no one will tell you about it

  - The upside is that this behavior can be used to allow a function to be called with different numbers of arguments. For example, this minus function tries to imitate the - operator by acting on either one or two arguments:

    ```
    function minus(a, b) {
      if (b === undefined) return -a;
      else return a - b;
    }
    console.log(minus(10));
    // → -10
    console.log(minus(10, 5));
    // → 5
    ```

  - If you write an = operator after a parameter, followed by an expression, the value of that expression will replace the argument when it is not given.

    ```
    function power(base, exponent = 2) {
    let result = 1;
      for (let count = 0; count < exponent; count++) {
        result *= base;
      }
      return result;
    }

    console.log(power(4));
    // → 16
    console.log(power(2, 6));
    // → 64
    ```

  - This is helpful because it makes it possible for a function to accept any number of arguments. For example, console.log does this—it outputs all of the values it is given.

  ## Closure

  - The ability to treat functions as values, combined with the fact that local bindings are re-created every time a function is called, brings up an interesting question. What happens to local bindings when the function call that created them is no longer active?

  - The following code shows an example of this. It defines a function, wrapValue, that creates a local binding. It then returns a function that accesses and returns this local binding.

    ```
    function wrapValue(n) {
      let local = n;
      return () => local;
    }

    let wrap1 = wrapValue(1);
    let wrap2 = wrapValue(2);
    console.log(wrap1());
    // → 1
    console.log(wrap2());
    // → 2

    ```

  - This feature—being able to reference a specific instance of a local binding in an enclosing scope—is called closure. A function that references bindings from local scopes around it is called a closure.

  - With a slight change, we can turn the previous example into a way to create functions that multiply by an arbitrary amount.

    ```
    function multiplier(factor) {
      return number => number * factor;
    }
    let twice = multiplier(2);
    console.log(twice(5));
    // → 10
    ```

  - The explicit local binding from the wrapValue example isn’t really needed since a parameter is itself a local binding.

  - A good mental model is to think of function values as containing both the code in their body and the environment in which they are created.

  ## Recursion

  - It is perfectly okay for a function to call itself, as long as it doesn’t do it so often that it overflows the stack. A function that calls itself is called recursive. Recursion allows some functions to be written in a different style. Take, for example, this alternative implementation of power:

    ```
    function power(base, exponent) {
      if (exponent == 0) {
        return 1;
      } else {
        return base * power(base, exponent - 1);
      }
    }
    console.log(power(2, 3));
    // → 8
    ```

  - This is rather close to the way mathematicians define exponentiation and arguably describes the concept more clearly than the looping variant. The function calls itself multiple times with ever smaller exponents to achieve the repeated multiplication.

  - But this implementation has one problem: in typical JavaScript implementations, it’s about three times slower than the looping version. Running through a simple loop is generally cheaper than calling a function multiple times.

  - Recursion is not always just an inefficient alternative to looping. Some problems really are easier to solve with recursion than with loops. Most often these are problems that require exploring or processing several “branches”, each of which might branch out again into even more branches.

  - Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite set of numbers can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produces that number?

  - For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice, whereas the number 15 cannot be reached at all. Here is a recursive solution:

    ```
    function findSolution(target) {
      function find(current, history) {
        if (current == target) {
          return history;
        } else if (current > target) {
          return null;
        } else {
          return find(current + 5, `(${history} + 5)`) ||
                 find(current * 3, `(${history} * 3)`);
        }
      }
      return find(1, "1");
    }
    console.log(findSolution(24));
    // → (((1 * 3) + 5) * 3)

    ```

  - To better understand how this function produces the effect we’re looking for, let’s look at all the calls to find that are made when searching for a solution for the number 13.

    ```
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
    ```

  ## Growing functions

  - There are two more or less natural ways for functions to be introduced into programs.

    1. The first is that you find yourself writing similar code multiple times. You’d prefer not to do that. Having more code means more space for mistakes to hide and more material to read for people trying to understand the program.

    2. The second way is that you find you need some functionality that you haven’t written yet and that sounds like it deserves its own function. You’ll start by naming the function, and then you’ll write its body. You might even start writing code that uses the function before you actually define the function itself.

  - How difficult it is to find a good name for a function is a good indication of how clear a concept it is that you’re trying to wrap.

  ## Functions and side effects

  - Functions can be roughly divided into those that are called for their side effects and those that are called for their return value. (Though it is definitely also possible to both have side effects and return a value.)

  - Functions that create values are easier to combine in new ways than functions that directly perform side effects. A pure function is a specific kind of value-producing function that not only has no side effects but also doesn’t rely on side effects from other code

  - A pure function has the pleasant property that, when called with the same arguments, it always produces the same value (and doesn’t do anything else).

  - Some operations are also easier to express in an efficient way when we use side effects, so computing speed can be a reason to avoid purity.

  ## Summary

  -This chapter taught you how to write your own functions. The function keyword, when used as an expression, can create a function value. When used as a statement, it can be used to declare a binding and give it a function as its value. Arrow functions are yet another way to create functions.

  - A key aspect in understanding functions is understanding scopes. Each block creates a new scope. Parameters and bindings declared in a given scope are local and not visible from the outside. Bindings declared with var behave differently—they end up in the nearest function scope or the global scope.

  - Separating the tasks your program performs into different functions is helpful. You won’t have to repeat yourself as much, and functions can help organize a program by grouping code into pieces that do specific things.
