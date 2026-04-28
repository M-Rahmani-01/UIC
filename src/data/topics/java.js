export const javaTopics = {
  basics: {
    title: 'Java Basics',
    difficulty: 'Beginner',
    estimatedTime: '50 mins',
    article: `## Introduction to Java

Java is one of the most popular programming languages in the world! It was created by James Gosling at Sun Microsystems in 1995. Java's motto: **"Write Once, Run Anywhere"** (WORA).

### Your First Java Program

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Namaste, India! 🇮🇳");
    }
}
\`\`\`

### Variables and Data Types

\`\`\`java
public class Variables {
    public static void main(String[] args) {
        int age = 20;
        double gpa = 8.5;
        char grade = 'A';
        boolean isStudent = true;
        String name = "Rahul";
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
    }
}
\`\`\`

### If-Else in Java

\`\`\`java
int marks = 85;

if (marks >= 90) {
    System.out.println("Grade: A+");
} else if (marks >= 80) {
    System.out.println("Grade: A");
} else if (marks >= 70) {
    System.out.println("Grade: B");
} else {
    System.out.println("Grade: C");
}
\`\`\`

### Loops

\`\`\`java
// For loop
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}

// While loop
int n = 1;
while (n <= 10) {
    System.out.print(n + " ");
    n++;
}
\`\`\``,
    youtubeLinks: [
      { title: 'Java Basics Hindi Tutorial', url: 'https://www.youtube.com/results?search_query=java+basics+hindi+tutorial' },
    ],
    problems: [
      {
        id: 'java-hello',
        title: 'Hello World in Java',
        difficulty: 'Easy',
        timeLimit: 10,
        description: 'Write a Java program that prints "Hello, World!" to the screen.',
        examples: [{ input: 'None', output: 'Hello, World!' }],
        constraints: 'Output must match exactly.',
        hint: 'Use System.out.println() inside the main method.',
        expectedOutput: 'Hello, World!',
        youtubeLinks: ['https://www.youtube.com/results?search_query=java+hello+world+program'],
      },
      {
        id: 'java-factorial',
        title: 'Factorial of a Number',
        difficulty: 'Medium',
        timeLimit: 30,
        description: 'Given a number N, calculate and print its factorial. Factorial of 5 = 5*4*3*2*1 = 120',
        examples: [{ input: '5', output: '120' }],
        constraints: '0 ≤ N ≤ 12',
        hint: 'Initialize result=1 and multiply from 1 to N in a loop.',
        expectedOutput: '120',
        youtubeLinks: ['https://www.youtube.com/results?search_query=java+factorial+program'],
      },
    ],
  },
}

export default javaTopics