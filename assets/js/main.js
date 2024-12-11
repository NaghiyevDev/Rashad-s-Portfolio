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
    
    function togglePaginationView() {
      const isMobile = window.innerWidth <= 768;
      
      // Select pagination sections
      const responsiveNav = document.querySelector('.responsive-pagination');
      const desktopNav = document.querySelector('.desktop-pagination');

      // Dynamically set IDs
      if (isMobile) {
          responsiveNav.id = 'pagination-container';
          desktopNav.removeAttribute('id');
      } else {
          desktopNav.id = 'pagination-container';
          responsiveNav.removeAttribute('id');
      }

      // Toggle display
      document.querySelector('.pagination-section.responsive').style.display = isMobile ? 'block' : 'none';
      document.querySelector('.pagination-section.desktop').style.display = isMobile ? 'none' : 'block';
    }

    // Initial check and event listener
    window.addEventListener('resize', togglePaginationView);
    togglePaginationView();
};