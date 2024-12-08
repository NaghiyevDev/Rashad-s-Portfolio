// utils.js

export function getShortContent(content, maxCount) {
    // Create a temporary DOM element to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Extract only the text content (stripping out HTML tags)
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
    // Truncate the text to the desired length
    if (textContent.length > maxCount) {
      return textContent.slice(0, maxCount) + '...';
    }
  
    return textContent;
  }
  


  /* 
  
    {
        "id": 8,
        "title": "Python Basics: A Beginner's Guide",
        "author": "Rashad Naghiyev",
        "date": "2024-12-06",
        "type": "programming-blog",
        "category": "Programming Language / Python",
        "img": "https://cdn.activestate.com/wp-content/uploads/2021/12/python-coding-mistakes.jpg",
        "content": "Python is one of the most popular programming languages, known for its simplicity and versatility. It is widely used in web development, data science, artificial intelligence, and more. Here's a quick overview of Python basics:<br><br><strong>1. Variables and Data Types:</strong><br>In Python, variables are dynamically typed, meaning you don't need to declare their type explicitly.<br><pre><code># Example of variables and data types\nname = \"John\"  # String\nage = 25        # Integer\nis_student = True  # Boolean\nheight = 5.9    # Float\n</code></pre><br><strong>2. Conditional Statements:</strong><br>Conditional statements allow you to execute code based on certain conditions.<br><pre><code># Example of a conditional statement\nif age > 18:\n    print(\"You are an adult.\")\nelse:\n    print(\"You are a minor.\")\n</code></pre><br><strong>3. Loops:</strong><br>Loops are used to repeat a block of code multiple times.<br><pre><code># Example of a for loop\nfor i in range(1, 6):\n    print(i)\n\n# Example of a while loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n</code></pre><br><strong>4. Functions:</strong><br>Functions in Python are used to encapsulate reusable code.<br><pre><code># Example of a function\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"Alice\"))\n</code></pre><br><strong>5. Lists and Dictionaries:</strong><br>Lists and dictionaries are essential data structures in Python.<br><pre><code># Example of a list\nfruits = [\"apple\", \"banana\", \"cherry\"]\n\n# Example of a dictionary\nperson = {\"name\": \"Alice\", \"age\": 30}\n</code></pre><br>These are just the basics of Python programming. With practice, you'll discover the true power and flexibility of this amazing language!"
    }
    
  */