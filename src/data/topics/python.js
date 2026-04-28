export const pythonTopics = {
  basics: {
    title: 'Python Basics',
    difficulty: 'Beginner',
    estimatedTime: '40 mins',
    article: `## What is Python?

Python is one of the most popular programming languages in the world. It was created by **Guido van Rossum** in 1991. Python is known for its simple and clean syntax that reads almost like English!

### Why Learn Python?

Python is used in many fields:
- **Web Development** (Django, Flask)
- **Data Science & AI** (NumPy, Pandas, TensorFlow)
- **Automation** (scripts, bots)
- **Game Development** (Pygame)

### Your First Python Program

Let's write the classic "Hello World" program:

\`\`\`python
print("Hello, World!")
print("Namaste, India! 🇮🇳")
\`\`\`

### Variables in Python

Variables are containers to store data. In Python, you don't need to declare the type:

\`\`\`python
name = "Rahul"
age = 20
gpa = 8.5
is_student = True

print(name)
print(age)
print(f"My name is {name} and I am {age} years old")
\`\`\`

### Data Types

Python has several built-in data types:

| Type | Example | Description |
|------|---------|-------------|
| int | 42 | Whole numbers |
| float | 3.14 | Decimal numbers |
| str | "Hello" | Text |
| bool | True/False | Boolean |

### Getting User Input

\`\`\`python
name = input("Enter your name: ")
age = int(input("Enter your age: "))
print(f"Hello {name}! You are {age} years old.")
\`\`\`

### Arithmetic Operators

\`\`\`python
a = 10
b = 3

print(a + b)   # Addition: 13
print(a - b)   # Subtraction: 7
print(a * b)   # Multiplication: 30
print(a / b)   # Division: 3.333...
print(a // b)  # Floor Division: 3
print(a % b)   # Modulo: 1
print(a ** b)  # Power: 1000
\`\`\`

### If-Else Statements

\`\`\`python
marks = 85

if marks >= 90:
    print("Grade: A+")
elif marks >= 80:
    print("Grade: A")
elif marks >= 70:
    print("Grade: B")
else:
    print("Grade: C")
\`\`\`

### Loops

**For loop:**
\`\`\`python
for i in range(5):
    print(f"Count: {i}")
\`\`\`

**While loop:**
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

Practice these concepts and you'll be writing Python like a pro in no time! 🚀`,
    youtubeLinks: [
      { title: 'Python Basics for Beginners - Full Tutorial', url: 'https://www.youtube.com/results?search_query=python+basics+beginners+hindi' },
      { title: 'Python Variables and Data Types', url: 'https://www.youtube.com/results?search_query=python+variables+hindi' },
      { title: 'Python in Hindi - Complete Course', url: 'https://www.youtube.com/results?search_query=python+complete+course+hindi' },
    ],
    problems: [
      {
        id: 'hello-world',
        title: 'Hello World',
        difficulty: 'Easy',
        timeLimit: 10,
        description: 'Write a Python program that prints "Hello, World!" to the screen. This is the classic first program every coder writes!',
        examples: [{ input: 'None', output: 'Hello, World!' }],
        constraints: 'Output must match exactly.',
        hint: 'Use the print() function. Remember, Python is case-sensitive!',
        expectedOutput: 'Hello, World!',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+hello+world'],
      },
      {
        id: 'add-two-numbers',
        title: 'Sum of Two Numbers',
        difficulty: 'Easy',
        timeLimit: 15,
        description: 'Write a program that takes two numbers as input and prints their sum.',
        examples: [{ input: '5\n3', output: '8' }],
        constraints: 'Numbers can be integers.',
        hint: 'Read two numbers using input(), convert them to int, then add and print.',
        expectedOutput: '8',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+input+output+beginner'],
      },
      {
        id: 'even-odd',
        title: 'Even or Odd',
        difficulty: 'Easy',
        timeLimit: 20,
        description: 'Given a number N, determine if it is Even or Odd. Print "Even" if even, "Odd" if odd.',
        examples: [{ input: '4', output: 'Even' }, { input: '7', output: 'Odd' }],
        constraints: '1 ≤ N ≤ 1000',
        hint: 'Use the modulo operator (%). If N % 2 == 0, it is even.',
        expectedOutput: 'Even',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+even+odd+program'],
      },
      {
        id: 'largest-of-three',
        title: 'Largest of Three Numbers',
        difficulty: 'Easy',
        timeLimit: 25,
        description: 'Given three numbers A, B, and C, find and print the largest number.',
        examples: [{ input: '3 7 5', output: '7' }],
        constraints: 'Numbers can be any integers.',
        hint: 'Use if-elif-else conditions to compare all three numbers.',
        expectedOutput: '7',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+largest+three+numbers'],
      },
      {
        id: 'fibonacci',
        title: 'Fibonacci Sequence',
        difficulty: 'Medium',
        timeLimit: 30,
        description: 'Print the first N numbers of the Fibonacci sequence. The sequence starts with 0, 1 and each subsequent number is the sum of the previous two.',
        examples: [{ input: '7', output: '0 1 1 2 3 5 8' }],
        constraints: '1 ≤ N ≤ 50',
        hint: 'Start with two variables a=0 and b=1. In a loop, print a, then update: a, b = b, a+b',
        expectedOutput: '0 1 1 2 3 5 8',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+fibonacci+series'],
      },
    ],
  },

  lists: {
    title: 'Lists in Python',
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    article: `## Lists in Python

A list is one of Python's most powerful data structures. It's an **ordered, mutable collection** that can hold any type of data!

### Creating Lists

\`\`\`python
fruits = ["apple", "banana", "mango"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

print(fruits)       # ['apple', 'banana', 'mango']
print(len(fruits))  # 3 (length of list)
\`\`\`

### Accessing Elements (Indexing)

\`\`\`python
fruits = ["apple", "banana", "mango", "orange"]

print(fruits[0])   # apple (first element)
print(fruits[1])   # banana
print(fruits[-1])  # orange (last element)
print(fruits[-2])  # mango
\`\`\`

### Slicing

\`\`\`python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])   # [20, 30, 40]
print(numbers[:3])    # [10, 20, 30]
print(numbers[2:])    # [30, 40, 50]
print(numbers[::-1])  # [50, 40, 30, 20, 10] (reversed)
\`\`\`

### List Methods

\`\`\`python
fruits = ["apple", "banana"]

fruits.append("mango")    # Add to end
fruits.insert(1, "kiwi")  # Insert at index 1
fruits.remove("banana")   # Remove by value
fruits.pop()              # Remove last element
fruits.sort()             # Sort alphabetically
fruits.reverse()          # Reverse the list

print(fruits)
\`\`\`

### Iterating Over Lists

\`\`\`python
marks = [85, 92, 78, 96, 70]

for mark in marks:
    print(mark)

# With index
for i, mark in enumerate(marks):
    print(f"Student {i+1}: {mark}")

# Sum and Average
total = sum(marks)
average = total / len(marks)
print(f"Average: {average}")
\`\`\`

### List Comprehension

\`\`\`python
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

evens = [x for x in range(10) if x % 2 == 0]
print(evens)    # [0, 2, 4, 6, 8]
\`\`\``,
    youtubeLinks: [
      { title: 'Python Lists Tutorial', url: 'https://www.youtube.com/results?search_query=python+lists+tutorial+hindi' },
      { title: 'Python List Methods', url: 'https://www.youtube.com/results?search_query=python+list+methods+hindi' },
    ],
    problems: [
      {
        id: 'list-max',
        title: 'Find Maximum in List',
        difficulty: 'Easy',
        timeLimit: 20,
        description: 'Given a list of N integers, find and print the maximum element.',
        examples: [{ input: '[3, 1, 4, 1, 5, 9, 2, 6]', output: '9' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'Traverse the list and keep track of the largest value seen so far.',
        expectedOutput: '9',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+max+in+list'],
      },
      {
        id: 'list-sum',
        title: 'Sum of List Elements',
        difficulty: 'Easy',
        timeLimit: 15,
        description: 'Given a list of integers, calculate and print the sum of all elements.',
        examples: [{ input: '[1, 2, 3, 4, 5]', output: '15' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'Use a loop to add each element, or use the built-in sum() function.',
        expectedOutput: '15',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+sum+list+elements'],
      },
      {
        id: 'reverse-list',
        title: 'Reverse a List',
        difficulty: 'Easy',
        timeLimit: 20,
        description: 'Given a list, print the elements in reverse order.',
        examples: [{ input: '[1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'Use list slicing with [::-1] or the reverse() method.',
        expectedOutput: '[5, 4, 3, 2, 1]',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+reverse+list'],
      },
      {
        id: 'count-evens',
        title: 'Count Even Numbers',
        difficulty: 'Easy',
        timeLimit: 20,
        description: 'Given a list of integers, count how many even numbers are in the list.',
        examples: [{ input: '[1, 2, 3, 4, 5, 6]', output: '3' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'Loop through the list. For each number, check if number % 2 == 0.',
        expectedOutput: '3',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+count+even+numbers+list'],
      },
      {
        id: 'remove-duplicates',
        title: 'Remove Duplicates',
        difficulty: 'Medium',
        timeLimit: 30,
        description: 'Given a list, remove all duplicate elements and print the unique elements in their original order.',
        examples: [{ input: '[1, 2, 2, 3, 1, 4, 3]', output: '[1, 2, 3, 4]' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'Create an empty result list. For each element, only add it if it\'s not already in the result list.',
        expectedOutput: '[1, 2, 3, 4]',
        youtubeLinks: ['https://www.youtube.com/results?search_query=python+remove+duplicates+list'],
      },
    ],
  },
}

export default pythonTopics