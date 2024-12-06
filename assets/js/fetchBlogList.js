// fetchBlogList.js

const blogs = [
    {
        "id": 1,
        "title": "Understanding React Hooks",
        "author": "Rashad Naghiyev",
        "date": "2024-12-06",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        "id": 2,
        "title": "Introduction to React Router",
        "author": "Rashad Naghiyev",
        "date": "2024-12-05",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
]


function getBlogs() {
    try {
      const blogList = blogs;
      const blogContainer = document.getElementById('blog-container');
      blogList.forEach((blog) => {
        console.log(blog)
        const blogDiv = document.createElement('div');
        blogDiv.className = 'card-v1';
        blogDiv.innerHTML = 
        `
        <h2>${blog.title}</h2>
        <p>${blog.content}</p>
        `
        blogContainer.appendChild(blogDiv);
      })
      // Your blog rendering code here
    } catch (error) {
      console.error('Failed to load blogs:', error);
    }
  }

getBlogs();