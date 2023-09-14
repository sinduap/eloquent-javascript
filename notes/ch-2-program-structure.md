# Chapter 2 Program Structure

- This is all notes on chapter 2 Program Structure

  ## Expressions and statements

  - A fragment of code that produces a value is called an expression. Every value
    that is written literally (such as 22 or "psychoanalysis") is an expression. An
    expression between parentheses is also an expression, as is a binary operator
    applied to two expressions or a unary operator applied to one.

  - If an expression corresponds to a sentence fragment, a JavaScript statement
    corresponds to a full sentence. A program is a list of statements

  - To catch and hold values, JavaScript provides a thing called a
    binding, or variable:

    ```
    let caught = 5 * 5;
    ```

  - You should imagine bindings as tentacles, rather than boxes. They do not
    contain values; they grasp them—two bindings can refer to the same value.

  - The words var and const can also be used to create bindings, in a way similar
    to let. The words var and const can also be used to create bindings, in a way similar to let.
    The word const stands for constant. It defines a constant binding, which
    points at the same value for as long as it lives.

  ## Binding names

  - A binding name may include dollar signs ($) or underscores (\_) but no other
    punctuation or special characters (<>?/':&^%).
