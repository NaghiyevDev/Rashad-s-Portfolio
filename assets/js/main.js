// main.js
import { getBlogs, getLatestBlogs } from './fetchBlogList.js';
import { getProjects } from './fetchMyProjects.js';

  
const pageName = window.location.pathname.split('/').pop();
console.log(pageName);
if (pageName === 'index.html' || pageName === '/' || pageName === '') {
  getLatestBlogs();
  getProjects();
};
if (pageName === 'blogs.html' || pageName === '/blogs' || pageName === 'blogs') {
    getBlogs();
};

