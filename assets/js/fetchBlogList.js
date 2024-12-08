// fetchBlogList.js
import { getShortContent } from "./utils.js";

export async function getBlogs() {
    try {
      // Fetch the JSON file
      const response = await fetch('/assets/data/blogList.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const blogList = await response.json();
      const blogContainer = document.getElementById('blog-container');

      const latestBlogs = blogList.filter(blog => blog.type ?? 'latest-blog');
      
      if(latestBlogs.length === 0){
         blogContainer.innerHTML = `<div>Blog Not Found</div>`;
      }

   
      latestBlogs.forEach((blog) => {
          const shortContent = getShortContent(blog.content.trim(), 300);
          const shortTitle = getShortContent(blog.title, 35)
          const blogDiv = document.createElement('div');
          blogDiv.className = 'card';
          const blogImage = blog.img ? blog.img : '/assets/gallery/no-image.jpg'
          blogDiv.innerHTML = `
          <a href="/blog-detail.html?id=${blog.id}" class="blog-detail-link">
            <img class="blog-img" src="${blogImage}" alt="${blog.title}">
           <div class="blog-content"> 
            <h2>${shortTitle}</h2>
            <p>${shortContent}</p>
           </div> 
          </a>
          `;
          blogContainer.appendChild(blogDiv);
      });
    } catch (error) {
      console.error('Failed to load blogs:', error);
    }
  }



