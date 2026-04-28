export const cTopics = {
  arrays: {
    title: 'Arrays in C',
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    article: `## Arrays in C

An array is a collection of **same-type elements** stored in **contiguous memory locations**. Arrays are the most fundamental data structure in C!

### Why Use Arrays?

Instead of declaring 100 separate variables, you can use one array:
\`\`\`c
// Without array (bad!)
int num1, num2, num3, ...num100;

// With array (great!)
int numbers[100];
\`\`\`

### Declaring and Initializing Arrays

\`\`\`c
#include <stdio.h>

int main() {
    // Declaration
    int arr[5];
    
    // Declaration with initialization
    int marks[5] = {85, 92, 78, 96, 70};
    
    // Without size
    int scores[] = {10, 20, 30, 40};
    
    printf("%d\\n", marks[0]);  // 85
    printf("%d\\n", marks[4]);  // 70
    
    return 0;
}
\`\`\`

### Accessing Elements

Array indexing starts at **0** in C!

\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};

printf("%d\\n", arr[0]);  // 10 (first)
printf("%d\\n", arr[2]);  // 30 (third)
printf("%d\\n", arr[4]);  // 50 (last)
\`\`\`

### Traversing Arrays with Loops

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {3, 1, 4, 1, 5};
    int n = 5;
    
    // Print all elements
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    // Find sum
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    printf("Sum = %d\\n", sum);
    
    return 0;
}
\`\`\`

### Finding Maximum Element

\`\`\`c
#include <stdio.h>

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = 8;
    int max = arr[0];
    
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    
    printf("Maximum element: %d\\n", max);
    return 0;
}
\`\`\`

### Important Notes

- Array index starts from **0**
- Last element is at index **n-1**  
- Accessing out-of-bound index causes **undefined behavior**
- Array size must be known at compile time (in basic C)`,
    youtubeLinks: [
      { title: 'Arrays in C - Complete Tutorial', url: 'https://www.youtube.com/results?search_query=arrays+in+c+hindi+tutorial' },
      { title: 'C Array Programs', url: 'https://www.youtube.com/results?search_query=c+array+programs+hindi' },
    ],
    problems: [
      {
        id: 'array-max',
        title: 'Find Maximum Element',
        difficulty: 'Easy',
        timeLimit: 30,
        description: 'Given an array of N integers, find and print the maximum element.',
        examples: [{ input: 'N=5, arr=[3,1,4,1,5]', output: '5' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'Start with max = arr[0]. Loop through the rest. If arr[i] > max, update max.',
        expectedOutput: '5',
        youtubeLinks: ['https://www.youtube.com/results?search_query=find+maximum+array+c'],
      },
      {
        id: 'array-sum',
        title: 'Sum of Array',
        difficulty: 'Easy',
        timeLimit: 25,
        description: 'Given an array of N integers, find the sum of all elements.',
        examples: [{ input: 'N=4, arr=[1,2,3,4]', output: '10' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'Initialize sum=0. Loop through each element and add it to sum.',
        expectedOutput: '10',
        youtubeLinks: ['https://www.youtube.com/results?search_query=sum+of+array+elements+c'],
      },
      {
        id: 'reverse-array',
        title: 'Reverse an Array',
        difficulty: 'Easy',
        timeLimit: 30,
        description: 'Given an array, print its elements in reverse order.',
        examples: [{ input: '[1, 2, 3, 4, 5]', output: '5 4 3 2 1' }],
        constraints: '1 ≤ N ≤ 50',
        hint: 'Loop from i = n-1 down to 0 and print arr[i] each time.',
        expectedOutput: '5 4 3 2 1',
        youtubeLinks: ['https://www.youtube.com/results?search_query=reverse+array+c+program'],
      },
      {
        id: 'count-even',
        title: 'Count Even Numbers',
        difficulty: 'Easy',
        timeLimit: 25,
        description: 'Count how many even numbers are in a given array.',
        examples: [{ input: '[1, 2, 3, 4, 5, 6]', output: '3' }],
        constraints: '1 ≤ N ≤ 100',
        hint: 'For each element, check if arr[i] % 2 == 0. If yes, increment a counter.',
        expectedOutput: '3',
        youtubeLinks: ['https://www.youtube.com/results?search_query=count+even+numbers+array+c'],
      },
      {
        id: 'second-max',
        title: 'Second Largest Element',
        difficulty: 'Medium',
        timeLimit: 40,
        description: 'Find the second largest element in an array.',
        examples: [{ input: '[3, 1, 4, 1, 5, 9, 2, 6]', output: '6' }],
        constraints: '2 ≤ N ≤ 100',
        hint: 'Track both max and second_max. Update carefully when you find larger elements.',
        expectedOutput: '6',
        youtubeLinks: ['https://www.youtube.com/results?search_query=second+largest+element+array+c'],
      },
    ],
  },

  strings: {
    title: 'Strings in C',
    difficulty: 'Beginner',
    estimatedTime: '50 mins',
    article: `## Strings in C

In C, a string is an **array of characters** terminated by a null character \\0. Unlike Python, C doesn't have a built-in string type.

### Declaring Strings

\`\`\`c
#include <stdio.h>

int main() {
    char name[] = "Rahul";
    char city[20] = "Mumbai";
    char greeting[] = {'H', 'e', 'l', 'l', 'o', '\\0'};
    
    printf("%s\\n", name);
    printf("%s\\n", city);
    return 0;
}
\`\`\`

### String Functions (string.h)

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char s1[] = "Hello";
    char s2[] = "World";
    
    printf("Length: %lu\\n", strlen(s1));   // 5
    strcpy(s1, "Hi");                       // Copy
    strcat(s1, " India");                   // Concatenate
    printf("Comparison: %d\\n", strcmp(s1, s2)); // Compare
    
    return 0;
}
\`\`\``,
    youtubeLinks: [
      { title: 'Strings in C Tutorial', url: 'https://www.youtube.com/results?search_query=strings+in+c+hindi' },
    ],
    problems: [
      {
        id: 'string-length',
        title: 'String Length',
        difficulty: 'Easy',
        timeLimit: 20,
        description: 'Find the length of a given string without using strlen().',
        examples: [{ input: '"Hello"', output: '5' }],
        constraints: 'String length ≤ 100',
        hint: 'Loop through characters until you find the null terminator \\0.',
        expectedOutput: '5',
        youtubeLinks: ['https://www.youtube.com/results?search_query=string+length+c+without+strlen'],
      },
      {
        id: 'palindrome-string',
        title: 'Palindrome Check',
        difficulty: 'Medium',
        timeLimit: 35,
        description: 'Check if a given string is a palindrome (reads the same forwards and backwards).',
        examples: [{ input: '"racecar"', output: 'Palindrome' }],
        constraints: 'Only lowercase letters',
        hint: 'Compare characters from both ends towards the middle.',
        expectedOutput: 'Palindrome',
        youtubeLinks: ['https://www.youtube.com/results?search_query=palindrome+string+c+program'],
      },
    ],
  },
}

export default cTopics