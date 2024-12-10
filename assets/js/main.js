// main.js
import { getBlogs, getLatestBlogs } from './fetchBlogList.js';
import { getProjects } from './fetchMyProjects.js';

  
const pageName = window.location.pathname.split('/').pop();

if (pageName === 'index.html') {
  getLatestBlogs();
  getProjects();
};
if (pageName === 'blogs.html') {
    getBlogs();
};

