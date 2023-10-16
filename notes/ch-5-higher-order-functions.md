# Chapter 5 Higher-Order Functions

- A large program is a costly program, and not just because of the time it takes to build. Size almost always involves complexity, and complexity confuses programmers. Confused programmers, in turn, introduce mistakes (bugs) into programs. A large program then provides a lot of space for these bugs to hide, making them hard to find.

- Let’s briefly go back to the final two example programs in the introduction. The first is self-contained and six lines long.

  ```
  let total = 0, count = 1;
    while (count <= 10) {
    total += count;
    count += 1;
  }
  console.log(total);
  ```

  The second relies on two external functions and is one line long.

  ```
  console.log(sum(range(1, 10)));
  ```

- Which one is more likely to contain a bug? If we count the size of the definitions of sum and range, the second program is also big—even bigger than the first. But still, I’d argue that it is more likely to be correct.

- It is more likely to be correct because the solution is expressed in a vocabulary that corresponds to the problem being solved. Summing a range of numbers isn’t about loops and counters. It is about ranges and sums.

- The definitions of this vocabulary (the functions sum and range) will still involve loops, counters, and other incidental details. But because they are expressing simpler concepts than the program as a whole, they are easier to get right.

## Abstraction

- In the context of programming, these kinds of vocabularies are usually calledabstractions. Abstractions hide details and give us the ability to talk about problems at a higher (or more abstract) level.

- As an analogy, compare these two recipes for pea soup. The first one goes like this:

        Put 1 cup of dried peas per person into a container. Add water until the peas are well covered. Leave the peas in water for at least   12 hours. Take the peas out of the water and put them in a cooking  pan. Add 4 cups of water per person. Cover the pan and keep the  peas simmering for two hours. Take half an onion per person. Cut  it into pieces with a knife. Add it to the peas. Take a stalk of  celery per person. Cut it into pieces with a knife. Add it to the   peas. Take a carrot per person. Cut it into pieces. With a knife!   Add it to the peas. Cook for 10 more minutes.

  And this is the second recipe:

      Per person: 1 cup dried split peas, half a chopped onion, a stalk of   celery, and a carrot.

      Soak peas for 12 hours. Simmer for 2 hours in 4 cups of water (per person). Chop and add vegetables. Cook for 10 more minutes.

- The second is shorter and easier to interpret. But you do need to understand a few more cooking-related words such as soak, simmer, chop, and, I guess, vegetable.

- When programming, we can’t rely on all the words we need to be waiting for us in the dictionary. Thus, we might fall into the pattern of the first recipe—work out the precise steps the computer has to perform, one by one, blind to the higher-level concepts that they express.

- It is a useful skill, in programming, to notice when you are working at too low a level of abstraction.

## Abstracting repetition

- Plain functions, as we’ve seen them so far, are a good way to build abstractions. But sometimes they fall short.

- It is common for a program to do something a given number of times. You can write a for loop for that, like this:

  ```
  for (let i = 0; i < 10; i++) {
      console.log(i);
  }
  ```

  Can we abstract “doing something N times” as a function? Well, it’s easy to write a function that calls console.log N times.

  ```
  function repeatLog(n) {
      for (let i = 0; i < n; i++) {
          console.log(i);
      }
  }
  ```

  But what if we want to do something other than logging the numbers? Since “doing something” can be represented as a function and functions are just values, we can pass our action as a function value.

  ```
  function repeat(n, action) {
      for (let i = 0; i < n; i++) {
          action(i);
      }
  }

  repeat(3, console.log);
  // → 0
  // → 1
  // → 2
  ```

  We don’t have to pass a predefined function to repeat. Often, it is easier to create a function value on the spot instead.

  ```
  let labels = [];
  repeat(5, i => {
    labels.push(`Unit ${i + 1}`);
  });

  console.log(labels);
  // → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
  ```

- This is structured a little like a for loop—it first describes the kind of loop and then provides a body. However, the body is now written as a function value, which is wrapped in the parentheses of the call to repeat. This is why it has to be closed with the closing brace and closing parenthesis. In cases like this example, where the body is a single small expression, you could also omit the braces and write the loop on a single line.

## Higher-order functions

- Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions. Since we have already seen that functions are regular values, there is nothing particularly remarkable about the fact that such functions exist. The term comes from mathematics, where the distinction between functions and other values is taken more seriously.

- Higher-order functions allow us to abstract over actions, not just values. They come in several forms. For example, we can have functions that create new functions.

  ```
  function greaterThan(n) {
      return m => m > n;
  }

  let greaterThan10 = greaterThan(10);
  console.log(greaterThan10(11));
  // → true
  ```

  And we can have functions that change other functions.

  ```
  function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
  }
  noisy(Math.min)(3, 2, 1);
  // → calling with [3, 2, 1]
  // → called with [3, 2, 1] , returned 1

  ```

  We can even write functions that provide new types of control flow.

  ```
  function unless(test, then) {
    if (!test) then();
  }

  repeat(3, n => {
      unless(n % 2 == 1, () => {
      console.log(n, "is even");
    });
  });
  // → 0 is even
  // → 2 is even
  ```

  There is a built-in array method, forEach, that provides something like a for/of loop as a higher-order function.

  ```
  ["A", "B"].forEach(l => console.log(l));
  // → A
  // → B
  ```

## Filtering arrays

- To find the scripts in the data set that are still in use, the following function might be helpful. It filters out the elements in an array that don’t pass a test.

  ```
  function filter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
         passed.push(element);
        }
    }
    return passed;
  }

  console.log(filter(SCRIPTS, script => script.living));
  // → [{name: "Adlam", …}, …]
  ```

- The function uses the argument named test, a function value, to fill a “gap” in the computation—the process of deciding which elements to collect.

- Note how the filter function, rather than deleting elements from the existing array, builds up a new array with only the elements that pass the test. This function is pure. It does not modify the array it is given.

- Like forEach, filter is a standard array method. The example defined the function only to show what it does internally. From now on, we’ll use it like this instead:

  ```
  console.log(SCRIPTS.filter(s => s.direction == "ttb"));
  // → [{name: "Mongolian", …}, …]
  ```

## Transforming with map

- Say we have an array of objects representing scripts, produced by filtering the SCRIPTS array somehow. But we want an array of names, which is easier to inspect.

- The map method transforms an array by applying a function to all of its elements and building a new array from the returned values. The new array will have the same length as the input array, but its content will have been mapped to a new form by the function.

  ```
  function map(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
  }

  let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");

  console.log(map(rtlScripts, s => s.name));
  // → ["Adlam", "Arabic", "Imperial Aramaic", …]
  ```

  Like forEach and filter, map is a standard array method.

## Summarizing with reduce

- Another common thing to do with arrays is to compute a single value from them. Our recurring example, summing a collection of numbers, is an instance of this. Another example is finding the script with the most characters.

- The higher-order operation that represents this pattern is called reduce (sometimes also called fold). It builds a value by repeatedly taking a single element from the array and combining it with the current value. When summing numbers, you’d start with the number zero and, for each element, add that to the sum.

- The parameters to reduce are, apart from the array, a combining function and a start value. This function is a little less straightforward than filter and map, so take a close look at it:

  ```
  function reduce(array, combine, start) {
      let current = start;
      for (let element of array) {
          urrent = combine(current, element);
      }
      return current;
  }

  console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
  // → 10
  ```

  The standard array method reduce, which of course corresponds to this function, has an added convenience. If your array contains at least one element, you are allowed to leave off the start argument. The method will take the first element of the array as its start value and start reducing at the second element.

  ```
  console.log([1, 2, 3, 4].reduce((a, b) => a + b));
  // → 10
  ```

## Composability

- There are a few more bindings, and the program is four lines longer. But it is still very readable. Higher-order functions start to shine when you need to compose operations..
  ```
  function average(array) {
      return array.reduce((a, b) => a + b) / array.length;
  }
  ```

## Summary

- Being able to pass function values to other functions is a deeply useful aspect of JavaScript. It allows us to write functions that model computations with “gaps” in them. The code that calls these functions can fill in the gaps by providing function values.

- Arrays provide a number of useful higher-order methods. You can use forEach to loop over the elements in an array. The filter method returns a new array containing only the elements that pass the predicate function. Transforming an array by putting each element through a function is done with map. You can use reduce to combine all the elements in an array into a single value. The some method tests whether any element matches a given predicate function. And findIndex finds the position of the first element that matches a predicate.
