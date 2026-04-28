export const javascriptTopics = {
  basics: {
    title: 'JavaScript Basics',
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    article: `## JavaScript — The Language of the Web

JavaScript (JS) is the only programming language that runs **natively in the browser**. It makes web pages interactive!

### Variables

\`\`\`javascript
let name = "Rahul";        // Can be changed
const PI = 3.14159;        // Cannot be changed
var oldStyle = "avoid";    // Old way (avoid)

console.log(name);
console.log(typeof name);  // "string"
\`\`\`

### Data Types

\`\`\`javascript
let num = 42;          // Number
let price = 9.99;      // Number (floats too)
let str = "Hello";     // String
let flag = true;       // Boolean
let nothing = null;    // Null
let undef;             // Undefined

console.log(typeof num);    // "number"
console.log(typeof str);    // "string"
\`\`\`

### Functions

\`\`\`javascript
// Regular function
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function (modern)
const add = (a, b) => a + b;

console.log(greet("Priya")); // Hello, Priya!
console.log(add(5, 3));      // 8
\`\`\`

### Arrays

\`\`\`javascript
const fruits = ["apple", "banana", "mango"];

console.log(fruits[0]);         // apple
console.log(fruits.length);     // 3

fruits.push("orange");          // Add to end
fruits.pop();                   // Remove from end

const doubled = [1,2,3].map(x => x * 2); // [2, 4, 6]
const evens = [1,2,3,4].filter(x => x % 2 === 0); // [2, 4]
\`\`\`

### Objects

\`\`\`javascript
const student = {
  name: "Ankit",
  age: 21,
  city: "Delhi",
  greet: function() {
    return "Hi, I'm " + this.name;
  }
};

console.log(student.name);    // Ankit
console.log(student["age"]);  // 21
console.log(student.greet()); // Hi, I'm Ankit
\`\`\``,
    youtubeLinks: [
      { title: 'JavaScript Basics - Hindi Tutorial', url: 'https://www.youtube.com/results?search_query=javascript+basics+hindi+tutorial' },
      { title: 'JS Variables and Data Types', url: 'https://www.youtube.com/results?search_query=javascript+variables+hindi' },
    ],
    problems: [
      {
        id: 'js-greet',
        title: 'Greeting Function',
        difficulty: 'Easy',
        timeLimit: 15,
        description: 'Write a JavaScript function that takes a name as input and returns "Hello, [name]!"',
        examples: [{ input: '"World"', output: '"Hello, World!"' }],
        constraints: 'Name is a non-empty string.',
        hint: 'Create a function that uses template literals or string concatenation.',
        expectedOutput: '"Hello, World!"',
        youtubeLinks: ['https://www.youtube.com/results?search_query=javascript+function+beginner'],
      },
      {
        id: 'js-sum-array',
        title: 'Array Sum',
        difficulty: 'Easy',
        timeLimit: 20,
        description: 'Write a function that returns the sum of all numbers in an array.',
        examples: [{ input: '[1, 2, 3, 4, 5]', output: '15' }],
        constraints: 'Array has at least one element.',
        hint: 'Use reduce() or a simple for loop to accumulate the sum.',
        expectedOutput: '15',
        youtubeLinks: ['https://www.youtube.com/results?search_query=javascript+array+sum+reduce'],
      },
      {
        id: 'js-palindrome',
        title: 'Palindrome Check',
        difficulty: 'Medium',
        timeLimit: 30,
        description: 'Check if a string is a palindrome. Return true or false.',
        examples: [{ input: '"racecar"', output: 'true' }],
        constraints: 'Only lowercase letters, no spaces.',
        hint: 'Compare the string with its reverse. Use split, reverse, join.',
        expectedOutput: 'true',
        youtubeLinks: ['https://www.youtube.com/results?search_query=javascript+palindrome+check'],
      },
    ],
  },
}

export default javascriptTopics