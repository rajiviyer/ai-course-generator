/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayoutAI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: `
            Generate a course tutorial as follows:
            Fields are Course Name, Description, Chapter Name, About, Duration
            Category: Programming, Topic: Python, Level: Basic, Duration: 1 hour, No of Chapters: 5
            Output Format: JSON          
          `,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `
            {
              "Course Name": "Python Programming Fundamentals",
              "Description": "This course provides a comprehensive introduction to Python programming, covering fundamental concepts, data types, control flow, functions, and more.",
              "Chapters": [
                {
                  "Chapter Name": "Introduction to Python",
                  "About": "This chapter introduces the basics of Python programming, including its history, features, and how to set up your development environment.",
                  "Duration": "15 minutes"
                },
                {
                  "Chapter Name": "Data Types and Variables",
                  "About": "Learn about different data types in Python, such as integers, floats, strings, and booleans. You'll also understand how to declare and manipulate variables.",
                  "Duration": "20 minutes"
                },
                {
                  "Chapter Name": "Operators and Expressions",
                  "About": "Explore various operators in Python, including arithmetic, comparison, logical, and assignment operators. Learn how to build expressions and evaluate them.",
                  "Duration": "15 minutes"
                },
                {
                  "Chapter Name": "Control Flow Statements",
                  "About": "Discover how to control the flow of execution in your Python programs using conditional statements (if, elif, else) and loops (for, while).",
                  "Duration": "20 minutes"
                },
                {
                  "Chapter Name": "Functions",
                  "About": "Learn about functions in Python, how to define them, pass arguments, and return values. Understand the importance of code reusability and modularity.",
                  "Duration": "10 minutes"
                }
              ],
              "Category": "Programming",
              "Topic": "Python",
              "Level": "Basic",
              "Duration": "1 hour",
              "No of Chapters": 5
            }`,
        },
      ],
    },
  ],
});

export const GenerateChapterContentAI =  model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Explain the concept in Detail on \n          Topic: Python, Chapter: Control Flow and Functions, in JSON Format with list of array\n          with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n[\n  {\n    \"title\": \"Control Flow\",\n    \"explanation\": \"Control flow refers to the order in which statements in a program are executed. Python uses various control flow mechanisms to alter the execution flow based on conditions or loops.\",\n    \"code_example\": \"\"\n  },\n  {\n    \"title\": \"Conditional Statements\",\n    \"explanation\": \"Conditional statements allow code execution to be based on certain conditions. Python uses the `if`, `elif`, and `else` keywords to construct conditional blocks.\",\n    \"code_example\": \"<precode>\\n# Check if a number is positive, negative, or zero\\nnumber = int(input(\\\"Enter a number: \\\"))\\n\\nif number > 0:\\n    print(\\\"The number is positive.\\\")\\nelif number < 0:\\n    print(\\\"The number is negative.\\\")\\nelse:\\n    print(\\\"The number is zero.\\\")\\n</precode>\"\n  },\n  {\n    \"title\": \"Looping Statements\",\n    \"explanation\": \"Looping statements allow code to be repeatedly executed based on a condition. Python provides two primary loop constructs: `for` and `while` loops.\",\n    \"code_example\": \"<precode>\\n# Iterate over a list using a for loop\\nnames = ['Alice', 'Bob', 'Charlie']\\nfor name in names:\\n    print(\\\"Hello, \\\" + name)\\n\\n# Iterate until a condition is met using a while loop\\ncount = 0\\nwhile count < 5:\\n    print(count)\\n    count += 1\\n</precode>\"\n  },\n  {\n    \"title\": \"Functions\",\n    \"explanation\": \"Functions are reusable blocks of code that perform specific tasks. They enhance code organization, readability, and modularity.\",\n    \"code_example\": \"<precode>\\n# Define a function to calculate the area of a rectangle\\ndef calculate_area(length, width):\\n    area = length * width\\n    return area\\n\\n# Call the function and store the result\\nrectangle_length = 5\\nrectangle_width = 10\\nrectangle_area = calculate_area(rectangle_length, rectangle_width)\\n\\n# Print the calculated area\\nprint(\\\"The area of the rectangle is: \\\", rectangle_area)\\n</precode>\"\n  },\n  {\n    \"title\": \"Function Parameters\",\n    \"explanation\": \"Parameters are variables passed to a function when it is called. They allow functions to receive data and operate on it.\",\n    \"code_example\": \"<precode>\\n# Function with two parameters\\ndef greet(name, greeting):\\n    print(greeting + \\\", \\\" + name)\\n\\n# Call the function with different parameters\\ngreet(\\\"Alice\\\", \\\"Hello\\\")\\ngreet(\\\"Bob\\\", \\\"Good morning\\\")\\n</precode>\"\n  },\n  {\n    \"title\": \"Function Return Values\",\n    \"explanation\": \"Functions can return values using the `return` statement. This allows functions to produce results that can be used in other parts of the program.\",\n    \"code_example\": \"<precode>\\n# Function that calculates the square of a number\\ndef square(number):\\n    return number * number\\n\\n# Call the function and store the returned value\\nsquared_number = square(5)\\n\\n# Print the squared value\\nprint(\\\"The square of 5 is: \\\", squared_number)\\n</precode>\"\n  },\n  {\n    \"title\": \"Scope and Lifetime\",\n    \"explanation\": \"Scope determines the visibility of variables within a program. Variables declared inside functions have local scope, while variables declared outside functions have global scope.\",\n    \"code_example\": \"<precode>\\n# Global variable\\nglobal_variable = 10\\n\\ndef my_function():\\n    # Local variable\\n    local_variable = 5\\n    print(local_variable)\\n    print(global_variable)\\n\\n# Call the function\\nmy_function()\\n\\n# Accessing the global variable\\nprint(global_variable)\\n</precode>\"\n  }\n]\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
