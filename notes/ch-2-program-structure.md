# Chapter 2 Program Structure

- This is all notes on chapter 2 Program Structure.

  ## Expressions and statements

  - A fragment of code that produces a value is called an expression. Every value that is written literally (such as 22 or "psychoanalysis") is an xpression. An expression between parentheses is also an expression, as is a binary perator applied to two expressions or a unary operator applied to one.

  - If an expression corresponds to a sentence fragment, a JavaScript statement corresponds to a full sentence. A program is a list of statements.

  - To catch and hold values, JavaScript provides a thing called a binding, or variable:

    ```
    let caught = 5 * 5;
    ```

  - You should imagine bindings as tentacles, rather than boxes. They do not contain values; they grasp them—two bindings can refer to the same value.

  - The words var and const can also be used to create bindings, in a way imilar to let. The words var and const can also be used to create bindings, in a ay similar to let. The word const stands for constant. It defines a constant binding, which points at the same value for as long as it lives.

  ## Binding names

  - A binding name may include dollar signs ($) or underscores (\_) but no other punctuation or special characters (<>?/':&^%).

  ## The environment

  -The collection of bindings and their values that exist at a given time is called the environment. When a program starts up, this environment is not empty. It always contains bindings that are part of the language standard, and most of he time, it also has bindings that provide ways to interact with the surrounding
  system.

  ## Functions

  - Executing a function is called invoking, calling, or applying it.

    ```
    prompt("Enter passcode");
    ```

  - You can call a function by putting parentheses after an expression that produces a function value. Usually you’ll directly use the name of the binding that olds the function. The values between the parentheses are given to the program inside the function. In the example, the prompt function uses the string hat we give it as the text to show in the dialog box. Values given to functions re called arguments. Different functions might need a different number or different types of arguments.

  ## Return Values

  - Showing a dialog box or writing text to the screen is a side effect.

    ```
    console.log('I'm performing side effect')
    ```

  - Functions may also produce values, in which case they don’t need to have a side effect to be useful.

    ```
    Math.max(1,2,3,4,5)
    → return 5
    ```

  - When a function produces a value, it is said to return that value. Anything that produces a value is an expression in JavaScript, which means function calls can be used within larger expressions.

    ```
    console.log(Math.max(1,2,3,4,5))
    → log 5
    ```

  ## Control flow

  - When your program contains more than one statement, the statements are executed as if they are a story, from top to bottom.

  ## Conditional execution

  - Not all programs are straight roads. We may, for example, want to create a branching road, where the program takes the proper branch based on the situation at hand. This is called conditional execution.

  - Conditional execution is created with the if keyword in JavaScript. In the simple case, we want some code to be executed if, and only if, a certain condition holds.

  ```
  if (// cond:expression) {
    // run this code block:statements
  }
  ```

  - You often won’t just have code that executes when a condition holds true, but also code that handles the other case. This alternate path is epresented by the second arrow in the diagram. You can use the else keyword, together with if, to create two separate, alternative execution paths.

    ```
    if (// cond:expression) {
      // if condition is met
      // run this code block:statements
    } else {
      // if condition is not met
      // run this code block instead:statements
    }
    ```

  - If you have more than two paths to choose from, you can “chain” multiple if/else pairs together.

    ```
    if (// cond 1:expression) {
      // if condition 1 is met
      // run this code block:statements
    } else if (// cond 2:expression) {
      // if condition 1 is not met
      // run this code block instead:statements
    } else {
      // if any conditions is not met
      // run this code block instead:statements
    }
    ```

  ## While and do loops

  - Looping control flow allows us to go back to some point in the program where we were before and repeat it with our current program state.

    ```
    while(// cond: expression) {
      // if condition is met
      // run this code block:statements
    }
    ```

  - A do loop is a control structure similar to a while loop. It differs only on one point: a do loop always executes its body at least once, and it starts testing whether it should stop only after that first execution.

    ```
    do {
      // run once this code block:statements
      // run again if condition is met
    }
    while(// cond: expression)
    ```

  ## For loops

  - Many loops follow the pattern shown in the while examples. First a “counter” binding is created to track the progress of the loop. Then comes a while loop, usually with a test expression that checks whether the counter has reached its end value. At the end of the loop body, the counter is updated to track progress

  - Because this pattern is so common, JavaScript and similar languages provide a slightly shorter and more comprehensive form, the for loop.

    ```
    for (// init:statement; // cond:expression; // updts:statement) {
      // run once if condition is met
      // run again if condition after updates is met
    }
    ```

  ## Breaking from a loop

  - Having the looping condition produce false is not the only way a loop can finish. There is a special statement called break that has the effect of immediately jumping out of the enclosing loop.

    ```
    for (// init:statement; // cond:expression; // updt:statement) {
      if(// condition:expression) {
        break;
        // Exit loop if condition is met
      }
    }
    ```

  - The continue keyword is similar to break, in that it influences the progress of a loop. When continue is encountered in a loop body, control jumps out of the body and continues with the loop’s next iteration.

  ## Dispatching on a value with switch

  - There is a construct called switch that is intended to express such a “dispatch” in a more direct way. Unfortunately, the syntax JavaScript uses for this (which it inherited from the C/Java line of programming languages) is somewhat awkward—a chain of if statements may look better. Here is an example:

    ```
    switch (// value:expression) {
      case value 1:expression 1:
        // If value 1 === value
        // Do this block:statement
        break;
      case value 2:expression 2:
        // If value 2 === value
        // Do this block:statement
        break;
      case value 3:expression 3:
        // If value 3 === value
        // Do this block:statement
        break;
      default:
        // In case nothing match
        // Do this block:statement
        break;
    }
    ```

  ## Summary

  - A program is built out of statements, which themselves sometimes contain more statements. Statements tend to contain expressions, which themselves can be built out of smaller expressions.

  - Putting statements after one another gives you a program that is executed from top to bottom. You can introduce disturbances in the flow of control by using conditional (if, else, and switch) and looping (while, do, and for) statements.

  - Bindings can be used to file pieces of data under a name, and they are useful for tracking state in your program. The environment is the set of bindings that are defined. JavaScript systems always put a number of useful standard bindings into your environment.

  - Functions are special values that encapsulate a piece of program. You can invoke them by writing functionName(argument1, argument2). Such a function call is an expression and may produce a value.
