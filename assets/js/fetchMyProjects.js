// fetchMyProjects.js

const blogs = [
    {
        "id": 1,
        "title": "To-do App",
        "author": "Rashad Naghiyev",
        "date": "2024-12-06",
        "content": "React Hooks are functions that let you use state and lifecycle features in functional components..."
      },
      {
        "id": 2,
        "title": "E-commmerce website",
        "author": "Rashad Naghiyev",
        "date": "2024-12-05",
        "content": "React Router is a standard library for routing in React applications..."
      }
]


function getProjects() {
    try {
      const projectList = projects;
      console.log(projects);
      // Your blog rendering code here
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }

getProjects();