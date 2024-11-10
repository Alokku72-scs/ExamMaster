const data = [
    {
      "id": 1,
      "question": "What is the time complexity of bubble sort in the best case scenario?",
      "options": ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
      "correctAnswer": "O(n)",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 2,
      "question": "What is the data structure used to implement a breadth-first search algorithm?",
      "options": ["Stack", "Queue", "Linked List", "Tree"],
      "correctAnswer": "Queue",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 3,
      "question": "Which sorting algorithm is considered the most efficient in terms of average time complexity?",
      "options": ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
      "correctAnswer": "Merge Sort",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 4,
      "question": "What is the purpose of a hash function in a hash table?",
      "options": ["To sort elements", "To search for elements", "To map keys to indices", "To store data in a specific order"],
      "correctAnswer": "To map keys to indices",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 5,
      "question": "What is the time complexity of binary search in the worst case scenario?",
      "options": ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      "correctAnswer": "O(log n)",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 6,
      "question": "What is the difference between a stack and a queue?",
      "options": ["Stack is LIFO, queue is FIFO", "Stack is FIFO, queue is LIFO", "Both are LIFO", "Both are FIFO"],
      "correctAnswer": "Stack is LIFO, queue is FIFO",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 7,
      "question": "What is the time complexity of inserting an element into a linked list?",
      "options": ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      "correctAnswer": "O(1)",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 8,
      "question": "What is the purpose of a heap data structure?",
      "options": ["To store elements in a specific order", "To implement priority queues", "To sort elements efficiently", "To search for elements quickly"],
      "correctAnswer": "To implement priority queues",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 9,
      "question": "What is the time complexity of deleting an element from a binary search tree?",
      "options": ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      "correctAnswer": "O(log n)",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 10,
      "question": "What is the difference between recursion and iteration?",
      "options": ["Recursion uses a loop, iteration uses function calls", "Recursion uses function calls, iteration uses a loop", "Both use loops", "Both use function calls"],
      "correctAnswer": "Recursion uses function calls, iteration uses a loop",
      "Subject": "Algorithm",
      "Level" : "Easy"
    },
    {
      "id": 11,
      "question": "What is the purpose of a compiler?",
      "options": ["To execute code directly", "To translate code into machine language", "To interpret code line by line", "To debug code"],
      "correctAnswer": "To translate code into machine language",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 12,
      "question": "What is the difference between a high-level language and a low-level language?",
      "options": ["High-level languages are closer to human language, low-level languages are closer to machine language", "High-level languages are closer to machine language, low-level languages are closer to human language", "There is no difference between them", "High-level languages are faster, low-level languages are slower"],
      "correctAnswer": "High-level languages are closer to human language, low-level languages are closer to machine language",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 13,
      "question": "What is the role of an operating system?",
      "options": ["To manage hardware and software resources", "To provide a user interface", "To execute programs", "All of the above"],
      "correctAnswer": "All of the above",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 14,
      "question": "What is the difference between RAM and ROM?",
      "options": ["RAM is volatile, ROM is non-volatile", "RAM is non-volatile, ROM is volatile", "Both are volatile", "Both are non-volatile"],
      "correctAnswer": "RAM is volatile, ROM is non-volatile",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 15,
      "question": "What is the purpose of a CPU?",
      "options": ["To store data", "To input data", "To process data", "To output data"],
      "correctAnswer": "To process data",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 16,
      "question": "What is the binary number system?",
      "options": ["A number system with base 10", "A number system with base 8", "A number system with base 2", "A number system with base 16"],
      "correctAnswer": "A number system with base 2",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 17,
      "question": "What is the purpose of a network interface card (NIC)?",
      "options": ["To connect devices to a network", "To process data", "To store data", "To input data"],
      "correctAnswer": "To connect devices to a network",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 18,
      "question": "What is the difference between a WAN and a LAN?",
      "options": ["WAN covers a large geographical area, LAN covers a small geographical area", "WAN covers a small geographical area, LAN covers a large geographical area", "Both cover a large geographical area", "Both cover a small geographical area"],
      "correctAnswer": "WAN covers a large geographical area, LAN covers a small geographical area",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 19,
      "question": "What is the purpose of a firewall?",
      "options": ["To protect a network from unauthorized access", "To speed up network traffic", "To encrypt data", "To decrypt data"],
      "correctAnswer": "To protect a network from unauthorized access",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 20,
      "question": "What is the difference between a virus and a worm?",
      "options": ["Virus needs a host program to spread, worm spreads independently", "Worm needs a host program to spread, virus spreads independently", "Both need a host program to spread", "Both spread independently"],
      "correctAnswer": "Virus needs a host program to spread, worm spreads independently",
      "Subject": "Fundamentals of Computer",
      "Level" : "Easy"
    },
    {
      "id": 21,
      "question": "What is the purpose of a database management system (DBMS)?",
      "options": ["To store and manage data", "To process data", "To input data", "To output data"],
      "correctAnswer": "To store and manage data",
      "Subject": "Fundamentals of Computer",
      "Level" : "Medium"
    },
    {
      "id": 22,
      "question": "What is the difference between SQL and NoSQL databases?",
      "options": ["SQL databases are relational, NoSQL databases are non-relational", "SQL databases are non-relational, NoSQL databases are relational", "Both are relational", "Both are non-relational"],
      "correctAnswer": "SQL databases are relational, NoSQL databases are non-relational",
      "Subject": "Fundamentals of Computer",
      "Level" : "Hard"
    }
];

export default data;
