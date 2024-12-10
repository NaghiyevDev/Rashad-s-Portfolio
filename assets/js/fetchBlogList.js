// fetchBlogList.js
import { getShortContent } from "./utils.js";


export async function getBlogs(page = 1) {
  const pageName = window.location.pathname.split('/').pop();

  // Allow the function to run for 'blogs.html', '/blogs', or 'blogs'
  if (pageName && pageName !== 'blogs.html' && pageName !== '/blogs' && pageName !== 'blogs') {
    return;
  }

  try {
    const response = await fetch(`/netlify/functions/getBlogs?page=${page}&limit=10`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogList = await response.json();
    const blogContainer = document.getElementById('blog-container');
    const paginationContainer = document.getElementById('pagination-container');
    const blogsPerPage = 10;

    // If no blogs are found, display "Blog Not Found" and hide pagination
    if (!blogList || blogList.length === 0) {
      blogContainer.innerHTML = `<div>Blog Not Found</div>`;
      paginationContainer.style.display = 'none'; // Hide pagination if no blogs
      return;
    }

    function renderBlogs(page) {
      blogContainer.innerHTML = '';
      const startIndex = (page - 1) * blogsPerPage;
      const endIndex = Math.min(startIndex + blogsPerPage, blogList.length);

      for (let i = startIndex; i < endIndex; i++) {
        const blog = blogList[i];
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
      }
    }

    function renderPagination(totalBlogs) {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(totalBlogs / blogsPerPage);

      // Don't show pagination if there's only one page
      if (totalPages <= 1) return;

      const maxLinks = 5;
      let startPage = page <= 3 ? 1 : page - 2;
      let endPage = page + 2 >= totalPages ? totalPages : page + 2;

      // Adjust pagination boundaries
      if (page >= totalPages - 2) {
        startPage = totalPages - maxLinks + 1;
        endPage = totalPages;
      }

      if (startPage < 1) startPage = 1;

      // Previous link
      const prevLink = document.createElement('a');
      prevLink.className = 'page-link prev';
      prevLink.href = '#';
      prevLink.innerHTML = '&laquo;';
      if (page === 1) prevLink.classList.add('disabled');
      prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (page > 1) {
          page--;
          renderBlogs(page);
          renderPagination(blogList.length);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      paginationContainer.appendChild(prevLink);

      // First page link
      if (startPage > 1) {
        const firstPageLink = document.createElement('a');
        firstPageLink.className = 'page-link';
        firstPageLink.href = '#';
        firstPageLink.innerText = '1';
        firstPageLink.addEventListener('click', (e) => {
          e.preventDefault();
          page = 1;
          renderBlogs(page);
          renderPagination(blogList.length);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(firstPageLink);
      }

      // Page links
      for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.innerText = i;
        pageLink.href = '#';
        pageLink.dataset.page = i;
        if (i === page) {
          pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', (e) => {
          e.preventDefault();
          page = Number(e.target.dataset.page);
          renderBlogs(page);
          renderPagination(blogList.length);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(pageLink);
      }

      // Last page link
      if (endPage < totalPages) {
        const lastPageLink = document.createElement('a');
        lastPageLink.className = 'page-link';
        lastPageLink.href = '#';
        lastPageLink.innerText = totalPages;
        lastPageLink.addEventListener('click', (e) => {
          e.preventDefault();
          page = totalPages;
          renderBlogs(page);
          renderPagination(blogList.length);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(lastPageLink);
      }

      // Next link
      const nextLink = document.createElement('a');
      nextLink.className = 'page-link next';
      nextLink.href = '#';
      nextLink.innerHTML = '&raquo;';
      if (page === totalPages) nextLink.classList.add('disabled');
      nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (page < totalPages) {
          page++;
          renderBlogs(page);
          renderPagination(blogList.length);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      paginationContainer.appendChild(nextLink);
    }

    // Initial render
    renderBlogs(page);
    renderPagination(blogList.length);

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


