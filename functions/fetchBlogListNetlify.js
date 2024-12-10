// fetchBlogList.js with netlify API
import { getShortContent } from "./utils.js";


export async function getBlogs() {
  const pageName = window.location.pathname.split('/').pop();

  // Allow the function to run for 'blogs.html', '/blogs', or 'blogs'
  if (pageName && pageName !== 'blogs.html' && pageName !== '/blogs' && pageName !== 'blogs') {
    return;
  }

  // Get the current page from the URL query parameter or default to 1
  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get('page')) || 1;
  console.log('Current Page: ', currentPage)

  try {
    const response = await fetch(`/.netlify/functions/getBlogs?page=${currentPage}&limit=10`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { blogList, totalCount } = await response.json();
    const blogContainer = document.getElementById('blog-container');
    const paginationContainer = document.getElementById('pagination-container');
    const blogsPerPage = 9;

    console.log('Blog Count: ', totalCount);
    console.log('Blog List: ', blogList);

    // If no blogs are found, display "Blog Not Found" and hide pagination
    if (!totalCount || totalCount === 0) {
      blogContainer.innerHTML = `<div>Blog Not Found</div>`;
      paginationContainer.style.display = 'none'; // Hide pagination if no blogs
      return;
    }

    function renderBlogs() {
      blogContainer.innerHTML = '';
      blogList.forEach((blog) => {
        const shortContent = getShortContent(blog.content.trim(), 300);
        const shortTitle = getShortContent(blog.title, 35);
        const blogDiv = document.createElement('div');
        blogDiv.className = 'card';
        const blogImage = blog.img ? blog.img : '/assets/gallery/no-image.jpg';
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
    }
    

    function renderPagination(totalBlogs) {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(totalBlogs / blogsPerPage);

      // Don't show pagination if there's only one page
      if (totalPages <= 1) return;

      const maxLinks = 5;
      let startPage = currentPage <= 3 ? 1 : currentPage - 2;
      let endPage = currentPage + 2 >= totalPages ? totalPages : currentPage + 2;

      // Adjust pagination boundaries
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxLinks + 1;
        endPage = totalPages;
      }

      if (startPage < 1) startPage = 1;

      // Previous link
      const prevLink = document.createElement('a');
      prevLink.className = 'page-link prev';
      prevLink.href = `?page=${currentPage - 1}`;
      prevLink.innerHTML = '&laquo;';
      if (currentPage === 1) prevLink.classList.add('disabled');
      paginationContainer.appendChild(prevLink);

      // First page link
      if (startPage > 1) {
        const firstPageLink = document.createElement('a');
        firstPageLink.className = 'page-link';
        firstPageLink.href = '?page=1';
        firstPageLink.innerText = '1';
        paginationContainer.appendChild(firstPageLink);
      }

      // Page links
      for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.innerText = i;
        pageLink.href = `?page=${i}`;
        if (i === currentPage) {
          pageLink.classList.add('active');
        }
        paginationContainer.appendChild(pageLink);
      }

      // Last page link
      if (endPage < totalPages) {
        const lastPageLink = document.createElement('a');
        lastPageLink.className = 'page-link';
        lastPageLink.href = `?page=${totalPages}`;
        lastPageLink.innerText = totalPages;
        paginationContainer.appendChild(lastPageLink);
      }

      // Next link
      const nextLink = document.createElement('a');
      nextLink.className = 'page-link next';
      nextLink.href = `?page=${currentPage + 1}`;
      nextLink.innerHTML = '&raquo;';
      if (currentPage === totalPages) nextLink.classList.add('disabled');
      paginationContainer.appendChild(nextLink);
    }

    // Initial render
    renderBlogs(currentPage);
    renderPagination(totalCount);

  } catch (error) {
    console.error('Failed to load blogs:', error);
  }
}


export async function getLatestBlogs() {
  const pageName = window.location.pathname.split('/').pop();

  // Allow the function to run for 'index.html', '/', or ''
  if (pageName && pageName !== 'index.html' && pageName !== '/' && pageName !== '') {
    return;
  }


  try {
    // Fetch the JSON file
    const response = await fetch('/assets/data/blogList.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogList = await response.json();
    const blogContainer = document.getElementById('blog-container');

    // Filter and sort blogs by date (assuming `date` is a property of the blog)
    const latestBlogs = blogList
      .filter(blog => blog.type === 'latest-blog') // Adjust as needed
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
      .slice(0, 3); // Get the first 4 blogs

    if (latestBlogs.length === 0) {
      blogContainer.innerHTML = `<div>Blog Not Found</div>`;
      return;
    }

    latestBlogs.forEach((blog) => {
      const shortContent = getShortContent(blog.content.trim(), 300);
      const shortTitle = getShortContent(blog.title, 35);
      const blogDiv = document.createElement('div');
      blogDiv.className = 'card';
      const blogImage = blog.img ? blog.img : '/assets/gallery/no-image.jpg';
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


