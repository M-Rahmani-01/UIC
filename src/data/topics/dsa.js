export const dsaTopics = {
  arrays: {
    title: 'Arrays for DSA',
    difficulty: 'Beginner',
    estimatedTime: '60 mins',
    article: `## Arrays in Data Structures

Arrays are the most fundamental and important data structure for coding interviews and competitive programming!

### Time Complexities

| Operation | Array |
|-----------|-------|
| Access | O(1) |
| Search | O(n) |
| Insert | O(n) |
| Delete | O(n) |

### Two-Pointer Technique

One of the most powerful array techniques:

\`\`\`python
def two_sum(arr, target):
    arr.sort()
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [arr[left], arr[right]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []

arr = [2, 7, 11, 15]
print(two_sum(arr, 9))  # [2, 7]
\`\`\`

### Sliding Window

\`\`\`python
def max_sum_subarray(arr, k):
    n = len(arr)
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, n):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

arr = [1, 4, 2, 9, 7, 3, 8]
print(max_sum_subarray(arr, 3))  # 20
\`\`\`

### Prefix Sum

\`\`\`python
def prefix_sum(arr):
    n = len(arr)
    prefix = [0] * (n + 1)
    
    for i in range(n):
        prefix[i+1] = prefix[i] + arr[i]
    
    return prefix

# Range sum query
def range_sum(prefix, l, r):
    return prefix[r+1] - prefix[l]
\`\`\``,
    youtubeLinks: [
      { title: 'DSA Arrays Complete Guide', url: 'https://www.youtube.com/results?search_query=dsa+arrays+complete+guide+hindi' },
      { title: 'Two Pointer Technique', url: 'https://www.youtube.com/results?search_query=two+pointer+technique+hindi' },
    ],
    problems: [
      {
        id: 'dsa-max-subarray',
        title: "Kadane's Algorithm - Max Subarray Sum",
        difficulty: 'Medium',
        timeLimit: 45,
        description: 'Given an array of integers, find the contiguous subarray with the maximum sum.',
        examples: [{ input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6 (subarray [4,-1,2,1])' }],
        constraints: '1 ≤ N ≤ 1000',
        hint: 'Track current_sum and max_sum. If current_sum goes negative, reset it to 0.',
        expectedOutput: '6',
        youtubeLinks: ['https://www.youtube.com/results?search_query=kadane+algorithm+hindi'],
      },
      {
        id: 'dsa-two-sum',
        title: 'Two Sum Problem',
        difficulty: 'Medium',
        timeLimit: 40,
        description: 'Given an array and a target, find two numbers that add up to the target. Return their indices.',
        examples: [{ input: '[2, 7, 11, 15], target=9', output: '[0, 1]' }],
        constraints: 'Exactly one solution exists.',
        hint: 'Use a dictionary/hash map. For each number, check if (target - number) is in the map.',
        expectedOutput: '[0, 1]',
        youtubeLinks: ['https://www.youtube.com/results?search_query=two+sum+problem+solution+hindi'],
      },
    ],
  },

  linkedlist: {
    title: 'Linked Lists',
    difficulty: 'Intermediate',
    estimatedTime: '75 mins',
    article: `## Linked Lists

A linked list is a linear data structure where elements (nodes) are stored in non-contiguous memory, connected by pointers.

### Structure

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements))

ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.display()  # 1 -> 2 -> 3
\`\`\``,
    youtubeLinks: [
      { title: 'Linked List Hindi Tutorial', url: 'https://www.youtube.com/results?search_query=linked+list+hindi+tutorial' },
    ],
    problems: [
      {
        id: 'reverse-linked-list',
        title: 'Reverse a Linked List',
        difficulty: 'Medium',
        timeLimit: 45,
        description: 'Reverse a singly linked list and return the new head.',
        examples: [{ input: '1 -> 2 -> 3 -> 4 -> 5', output: '5 -> 4 -> 3 -> 2 -> 1' }],
        constraints: '1 ≤ N ≤ 1000',
        hint: 'Use three pointers: prev, current, next. Iterate and redirect links.',
        expectedOutput: '5 -> 4 -> 3 -> 2 -> 1',
        youtubeLinks: ['https://www.youtube.com/results?search_query=reverse+linked+list+hindi'],
      },
    ],
  },
}

export default dsaTopics