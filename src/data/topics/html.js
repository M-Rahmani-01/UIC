export const htmlTopics = {
  tags: {
    title: 'HTML Basics & Tags',
    difficulty: 'Beginner',
    estimatedTime: '40 mins',
    article: `## Introduction to HTML

HTML stands for **HyperText Markup Language**. It is the standard language for creating web pages. Every website you visit is built with HTML at its core!

### HTML Document Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>Welcome to my website!</p>
  </body>
</html>
\`\`\`

### Common Tags

\`\`\`html
<!-- Headings -->
<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<h3>Smaller Heading</h3>

<!-- Paragraph -->
<p>This is a paragraph of text.</p>

<!-- Links -->
<a href="https://google.com">Click here to visit Google</a>

<!-- Images -->
<img src="photo.jpg" alt="My photo" width="300">

<!-- Lists -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First</li>
  <li>Second</li>
</ol>
\`\`\`

### Div and Span

\`\`\`html
<!-- Block element (takes full width) -->
<div class="container">
  <p>This is inside a div</p>
</div>

<!-- Inline element (only takes needed width) -->
<p>This is <span style="color: red">red</span> text.</p>
\`\`\``,
    youtubeLinks: [
      { title: 'HTML Basics Hindi Tutorial', url: 'https://www.youtube.com/results?search_query=html+basics+hindi+tutorial' },
    ],
    problems: [
      {
        id: 'html-page',
        title: 'Create Your First HTML Page',
        difficulty: 'Easy',
        timeLimit: 20,
        description: 'Create a simple HTML page with: a title "My Profile", an h1 heading with your name, and a paragraph about yourself.',
        examples: [{ input: 'None', output: 'Valid HTML page with heading and paragraph' }],
        constraints: 'Must include DOCTYPE, html, head, body tags.',
        hint: 'Start with the basic HTML skeleton and add your content in the body.',
        expectedOutput: 'Valid HTML structure',
        youtubeLinks: ['https://www.youtube.com/results?search_query=create+html+page+beginners'],
      },
    ],
  },
}

export default htmlTopics