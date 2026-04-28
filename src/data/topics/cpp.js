export const cppTopics = {
  classes: {
    title: 'Classes in C++',
    difficulty: 'Intermediate',
    estimatedTime: '60 mins',
    article: `## Classes and Objects in C++

C++ is an Object-Oriented Programming (OOP) language. Classes are the fundamental building blocks of OOP.

### What is a Class?

A class is a **blueprint** for creating objects. Think of it like a cookie cutter — the class is the cutter, and objects are the cookies!

\`\`\`cpp
#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int age;
    float gpa;
    
    void display() {
        cout << "Name: " << name << endl;
        cout << "Age: " << age << endl;
        cout << "GPA: " << gpa << endl;
    }
};

int main() {
    Student s1;
    s1.name = "Rahul";
    s1.age = 20;
    s1.gpa = 8.5;
    
    s1.display();
    return 0;
}
\`\`\`

### Constructors

\`\`\`cpp
class Rectangle {
public:
    int width, height;
    
    // Constructor
    Rectangle(int w, int h) {
        width = w;
        height = h;
    }
    
    int area() {
        return width * height;
    }
};

int main() {
    Rectangle r(10, 5);
    cout << "Area: " << r.area() << endl; // 50
    return 0;
}
\`\`\``,
    youtubeLinks: [
      { title: 'C++ Classes Hindi Tutorial', url: 'https://www.youtube.com/results?search_query=cpp+classes+hindi' },
    ],
    problems: [
      {
        id: 'cpp-area',
        title: 'Area of Rectangle',
        difficulty: 'Easy',
        timeLimit: 25,
        description: 'Create a Rectangle class and calculate its area.',
        examples: [{ input: 'width=10, height=5', output: 'Area = 50' }],
        constraints: 'Width and height are positive integers.',
        hint: 'Create a class with width and height members. Add an area() method.',
        expectedOutput: 'Area = 50',
        youtubeLinks: ['https://www.youtube.com/results?search_query=cpp+class+rectangle+area'],
      },
    ],
  },
}

export default cppTopics