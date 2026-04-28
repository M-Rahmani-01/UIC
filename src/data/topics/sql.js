export const sqlTopics = {
  select: {
    title: 'SQL SELECT Statements',
    difficulty: 'Beginner',
    estimatedTime: '40 mins',
    article: `## Introduction to SQL

SQL (Structured Query Language) is the language used to communicate with databases. Almost every application uses a database, making SQL an essential skill!

### What is a Database?

A database is an organized collection of data. Think of it like a very organized Excel spreadsheet. Data is stored in **tables**, which have **rows** and **columns**.

### Basic SELECT Query

\`\`\`sql
-- Select all columns from a table
SELECT * FROM students;

-- Select specific columns
SELECT name, age FROM students;

-- Select with condition
SELECT * FROM students WHERE age > 18;

-- Select with ordering
SELECT * FROM students ORDER BY marks DESC;

-- Limit results
SELECT * FROM students LIMIT 5;
\`\`\`

### WHERE Clause

\`\`\`sql
-- Equals
SELECT * FROM products WHERE category = 'Electronics';

-- Greater/Less than
SELECT * FROM orders WHERE amount > 1000;

-- BETWEEN
SELECT * FROM employees WHERE salary BETWEEN 30000 AND 60000;

-- LIKE (pattern matching)
SELECT * FROM users WHERE name LIKE 'R%';  -- Names starting with R

-- IN
SELECT * FROM students WHERE city IN ('Mumbai', 'Delhi', 'Bangalore');
\`\`\``,
    youtubeLinks: [
      { title: 'SQL Basics Hindi Tutorial', url: 'https://www.youtube.com/results?search_query=sql+basics+hindi+tutorial' },
    ],
    problems: [
      {
        id: 'sql-select-all',
        title: 'Select All Students',
        difficulty: 'Easy',
        timeLimit: 10,
        description: 'Write an SQL query to select all records from the "students" table.',
        examples: [{ input: 'Table: students', output: 'All rows and columns from students' }],
        constraints: 'Use standard SQL syntax.',
        hint: 'Use SELECT * to select all columns. Use FROM to specify the table.',
        expectedOutput: 'SELECT * FROM students;',
        youtubeLinks: ['https://www.youtube.com/results?search_query=sql+select+all+records'],
      },
      {
        id: 'sql-where',
        title: 'Filter with WHERE',
        difficulty: 'Easy',
        timeLimit: 15,
        description: 'Write an SQL query to find all students with marks greater than 80.',
        examples: [{ input: 'students table with marks column', output: 'Students with marks > 80' }],
        constraints: 'Use WHERE clause.',
        hint: 'Use SELECT * FROM students WHERE marks > 80;',
        expectedOutput: 'SELECT * FROM students WHERE marks > 80;',
        youtubeLinks: ['https://www.youtube.com/results?search_query=sql+where+clause+tutorial'],
      },
    ],
  },
}

export default sqlTopics